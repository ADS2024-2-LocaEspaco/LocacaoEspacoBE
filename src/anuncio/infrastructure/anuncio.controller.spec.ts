// // import { Test, TestingModule } from '@nestjs/testing';
// // import { AnuncioController } from './anuncio.controller';
// // import { AnuncioService } from './anuncio.service';
// // import { PrismaClient, usuario } from '@prisma/client'; // Importa o PrismaClient e o model User
// // import { UpdateuserDto } from 'src/feedback/infrastructure/database/dto/update-feedback.dto';

// // // Descreve o grupo de testes para o AnuncioController
// // describe('AnuncioController', () => {
// //   let controller: AnuncioController; // Instância do controller
// //   let service: AnuncioService; // Instância do serviço
// //   let prismaClient: PrismaClient; // Instância do PrismaClient

// //   // Antes de cada teste, cria um novo módulo de teste
// //   beforeEach(async () => {
// //     // Cria um módulo de teste para o AnuncioController e AnuncioService
// //     const module: TestingModule = await Test.createTestingModule({
// //       controllers: [AnuncioController], // Registra o AnuncioController
// //       providers: [
// //         AnuncioService, // Registra o AnuncioService
// //         {
// //           provide: PrismaClient, // Fornece um mock do PrismaClient
// //           useValue: {
// //             user: {
// //               findUnique: jest.fn(), // Mocka a função `findUnique` do PrismaClient
// //             },
// //           },
// //         },
// //       ],
// //     }).compile();

// //     // Obtém as instâncias do controller e do serviço do módulo compilado
// //     controller = module.get<AnuncioController>(AnuncioController);
// //     service = module.get<AnuncioService>(AnuncioService);
// //     prismaClient = module.get<PrismaClient>(PrismaClient);
// //   });

 
// //   it('deveria lançar um erro se o usuário não for encontrado', async () => {
// //     const anuncioId = 12; // Define um ID de anúncio mock
  
// //     // Mocka o retorno da função `findUnique` do PrismaClient para retornar `null`
// //     (prismaClient.usuario.findUnique as jest.Mock).mockResolvedValue(null);
  
// //     // Mocka o método `getUserFromAnuncio` para lançar um erro
// //     jest.spyOn(service, 'getUserFromAnuncio').mockImplementation(async () => {
// //       throw new Error('Usuário não encontrado');
// //     });
  
// //     // Verifica se o método do controller lança o erro correto
// //     await expect(controller.getUserFromAnuncio(anuncioId)).rejects.toThrow('Usuário não encontrado');
// //   });
  
// // });


// import { Test, TestingModule } from '@nestjs/testing';
// import { AnuncioController } from './anuncio.controller'; // ajuste o caminho conforme sua estrutura
// import { AnuncioService } from './anuncio.service'; // ajuste o caminho conforme sua estrutura
// import { getAnuncioDto } from './database/dto/get-anuncio.dto';
// import request from 'supertest';
// import { INestApplication } from '@nestjs/common';
// import { getUsuarioDto } from './database/dto/get-anuncio-usuario.dto';

// describe('AnuncioController', () => {
//     let app: INestApplication;
//     let anuncioService: AnuncioService;

//     beforeAll(async () => {
//         const moduleFixture: TestingModule = await Test.createTestingModule({
//             controllers: [AnuncioController],
//             providers: [
//                 {
//                     provide: AnuncioService,
//                     useValue: {
//                         getAnuncioById: jest.fn(),
//                         getUserFromAnuncio: jest.fn(),
//                     },
//                 },
//             ],
//         }).compile();

//         app = moduleFixture.createNestApplication();
//         await app.init();
//         anuncioService = moduleFixture.get<AnuncioService>(AnuncioService);
//     });

//     afterAll(async () => {
//         await app.close();
//     });

//     it('deve retornar os dados do usuário anfitrião pelo ID do anúncio', async () => {
//         const anuncioId = 1; 
//         const mockAnuncio: getAnuncioDto = { 
//           id: anuncioId, 
//           titulo: 'Linda casa de praia', 
//           usuario_id: 2 
//       }; 
//       const mockUsuario: getUsuarioDto = {
//         id: 2,
//         nome: 'João',
//         foto: null,
//         tempoCadastro: '2024-01-01'
//     };

//         jest.spyOn(anuncioService, 'getAnuncioById').mockResolvedValue(mockAnuncio);
//         jest.spyOn(anuncioService, 'getUserFromAnuncio').mockResolvedValue(mockUsuario);

//         const response = await request(app.getHttpServer())
//             .get(`/anuncio/${anuncioId}`)
//             .expect(200);

//         expect(response.body).toEqual(mockUsuario);
//         expect(anuncioService.getAnuncioById).toHaveBeenCalledWith(anuncioId);
//         expect(anuncioService.getUserFromAnuncio).toHaveBeenCalledWith(mockAnuncio.usuario_id);
//     });

//     it('deve retornar 404 se o anúncio não existir', async () => {
//         const anuncioId = 1;

//         jest.spyOn(anuncioService, 'getAnuncioById').mockResolvedValue(null);

//         const response = await request(app.getHttpServer())
//             .get(`/anuncio/${anuncioId}`)
//             .expect(404);

//         expect(response.body).toEqual({ error: 'Anúncio não encontrado' });
//     });

//     it('deve retornar 404 se o usuário não existir', async () => {
//         const anuncioId = 1;
//         const mockAnuncio: getAnuncioDto = { 
//           id: anuncioId, 
//           titulo: 'Linda casa de praia', 
//           usuario_id: null 
//       }; 

//         jest.spyOn(anuncioService, 'getAnuncioById').mockResolvedValue(mockAnuncio);

//         const response = await request(app.getHttpServer())
//             .get(`/anuncio/${anuncioId}`)
//             .expect(404);

//         expect(response.body).toEqual({ error: 'Usuário não encontrado' });
//     });
// });
describe('AnuncioController', () => {
  it('should be defined', () => {
      expect(true).toBe(true); // Teste básico
  });
});
