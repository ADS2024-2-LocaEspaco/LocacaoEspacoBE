import { Test, TestingModule } from '@nestjs/testing';
import { AnuncioController } from './anuncio.controller';
import { AnuncioService } from './anuncio.service';
import { PrismaClient, User } from '@prisma/client'; // Importa o PrismaClient e o model User

// Descreve o grupo de testes para o AnuncioController
describe('AnuncioController', () => {
  let controller: AnuncioController; // Instância do controller
  let service: AnuncioService; // Instância do serviço
  let prismaClient: PrismaClient; // Instância do PrismaClient

  // Antes de cada teste, cria um novo módulo de teste
  beforeEach(async () => {
    // Cria um módulo de teste para o AnuncioController e AnuncioService
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnuncioController], // Registra o AnuncioController
      providers: [
        AnuncioService, // Registra o AnuncioService
        {
          provide: PrismaClient, // Fornece um mock do PrismaClient
          useValue: {
            user: {
              findUnique: jest.fn(), // Mocka a função `findUnique` do PrismaClient
            },
          },
        },
      ],
    }).compile();

    // Obtém as instâncias do controller e do serviço do módulo compilado
    controller = module.get<AnuncioController>(AnuncioController);
    service = module.get<AnuncioService>(AnuncioService);
    prismaClient = module.get<PrismaClient>(PrismaClient);
  });

  it('deveria retornar um anfitriao de um anuncio', async () => {
    // Define um usuário mock para o teste
    const mockUser: User = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      username: 'johndoe',
      fullname: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '12345678901',
      phone: '11987654321',
      address: '123 Main St',
      state: 'SP',
      city: 'São Paulo',
      cep: '0100000',
      photo: 'path/to/photo.jpg',
      roleId: 1,
      createdAt: new Date('2024-09-06T20:42:39.000Z') // Define o createdAt como uma instância de Date
    };

    const anuncioId = 'anuncio-id-123'; // Define um ID de anúncio mock

    // Mocka o retorno do método `getUserFromAnuncio` para retornar o usuário mock
    jest.spyOn(service, 'getUserFromAnuncio').mockResolvedValue(mockUser);

    // Mocka o retorno da função `findUnique` do PrismaClient para retornar o usuário mock
    (prismaClient.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    // Chama o método do controller e verifica o resultado
    const result = await controller.getUserFromAnuncio(anuncioId);

    // Verifica se o resultado é igual ao usuário mock
    expect(result).toEqual(mockUser);
    // Verifica se o método `getUserFromAnuncio` foi chamado com o ID de anúncio correto
    expect(service.getUserFromAnuncio).toHaveBeenCalledWith(anuncioId);
  });

  it('deveria lançar um erro se o usuário não for encontrado', async () => {
    const anuncioId = 'anuncio-id-456'; // Define um ID de anúncio mock
  
    // Mocka o retorno da função `findUnique` do PrismaClient para retornar `null`
    (prismaClient.user.findUnique as jest.Mock).mockResolvedValue(null);
  
    // Mocka o método `getUserFromAnuncio` para lançar um erro
    jest.spyOn(service, 'getUserFromAnuncio').mockImplementation(async () => {
      throw new Error('Usuário não encontrado');
    });
  
    // Verifica se o método do controller lança o erro correto
    await expect(controller.getUserFromAnuncio(anuncioId)).rejects.toThrow('Usuário não encontrado');
  });
  
});
