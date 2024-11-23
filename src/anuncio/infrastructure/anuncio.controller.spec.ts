import { Test, TestingModule } from '@nestjs/testing';
import { AnuncioController } from './anuncio.controller';
import { AnuncioService } from './anuncio.service';
import { NotFoundException } from '@nestjs/common';

describe('AnuncioController', () => {
  let controller: AnuncioController;
  let service: AnuncioService;

  const mockAnuncioService = {
    getUserFromAnuncio: jest.fn(),
    getComodidadesByAnuncioId: jest.fn(),
    getAnuncioById: jest.fn(), // Para o método que usa getAnuncioById
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnuncioController],
      providers: [
        { provide: AnuncioService, useValue: mockAnuncioService },
      ],
    }).compile();

    controller = module.get<AnuncioController>(AnuncioController);
    service = module.get<AnuncioService>(AnuncioService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserFromAnuncio', () => {
    it('deve retornar o usuário associado ao anúncio', async () => {
      const usuarioMock = { id: 1, nome: 'João' };
      mockAnuncioService.getUserFromAnuncio.mockResolvedValue(usuarioMock);

      const result = await controller.getUserFromAnuncio(1);
      expect(result).toEqual(usuarioMock);
      expect(mockAnuncioService.getUserFromAnuncio).toHaveBeenCalledWith(1);
    });

    it('deve retornar null se não encontrar o usuário', async () => {
      mockAnuncioService.getUserFromAnuncio.mockResolvedValue(null);

      const result = await controller.getUserFromAnuncio(1);
      expect(result).toBeNull();
      expect(mockAnuncioService.getUserFromAnuncio).toHaveBeenCalledWith(1);
    });
  });

  describe('getComodidadesByAnuncioId', () => {
    it('deve retornar as comodidades com sucesso', async () => {
      const comodidadesMock = [{ id: 1, descricao: 'Piscina' }];
      mockAnuncioService.getComodidadesByAnuncioId.mockResolvedValue(comodidadesMock);

      const result = await controller.getComodidadesByAnuncioId(1);
      expect(result).toEqual(comodidadesMock);
      expect(mockAnuncioService.getComodidadesByAnuncioId).toHaveBeenCalledWith(1);
    });

    it('deve lançar erro se as comodidades não forem encontradas', async () => {
      mockAnuncioService.getComodidadesByAnuncioId.mockResolvedValue(null);

      await expect(controller.getComodidadesByAnuncioId(1))
        .rejects
        .toThrow(NotFoundException);
    });
  });
});
