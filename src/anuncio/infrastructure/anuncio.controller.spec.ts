import { Test, TestingModule } from '@nestjs/testing';
import { AnuncioController } from './anuncio.controller';
import { AnuncioService } from './anuncio.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('AnuncioController', () => {
    let app: INestApplication;

  
    const anuncioService = {
        getAnuncioById: jest.fn(),
        getUserFromAnuncio: jest.fn(),
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [AnuncioController],
            providers: [
                { provide: AnuncioService, useValue: anuncioService },
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it('deve retornar os dados do usuário anfitrião pelo ID do anúncio', async () => {
        const mockAnuncio = { id: 1, titulo: 'Anúncio Teste', usuario_id: 1 };
        const mockUsuario = { id: 1, nome: 'Usuário Teste', foto: null, tempoCadastro: '2023-01-01' };

        anuncioService.getAnuncioById.mockResolvedValue(mockAnuncio);
        anuncioService.getUserFromAnuncio.mockResolvedValue(mockUsuario);

        const response = await request(app.getHttpServer())
            .get('/anuncio/1')
            .expect(200);

        expect(response.body).toEqual(mockUsuario);
        expect(anuncioService.getAnuncioById).toHaveBeenCalledWith(1);
        expect(anuncioService.getUserFromAnuncio).toHaveBeenCalledWith(1);
    });

    it('deve retornar 404 se o anúncio não existir', async () => {
      const anuncioId = null; 
      jest.spyOn(anuncioService, 'getAnuncioById').mockResolvedValue(null); 
  
      await request(app.getHttpServer())
          .get(`/anuncio/${anuncioId}`)
          .expect(404); 
  });
  

    it('deve retornar 404 se o usuário não existir', async () => {
        const mockAnuncio = { id: 1, titulo: 'Anúncio Teste', usuario_id: null };
        anuncioService.getAnuncioById.mockResolvedValue(mockAnuncio);

        await request(app.getHttpServer())
            .get('/anuncio/1')
            .expect(404);
    });
});
