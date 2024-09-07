import { AnuncioService } from './anuncio.service';
import { PrismaClient, Anuncio, User } from '@prisma/client';

jest.mock('@prisma/client'); // Mock do PrismaClient

describe('AnuncioService', () => {
  let service: AnuncioService;
  let prismaMock: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    prismaMock = new PrismaClient() as jest.Mocked<PrismaClient>; // Mock do Prisma
    service = new AnuncioService(); // Passar o mock para o service
  });

  it('should return "Usuário não encontrado" if user is null', async () => {
    const anuncioId = 'some-anuncio-id';
    const mockAnuncio = { id: anuncioId, userId: 'some-user-id' } as Anuncio;
    
    // Mockando `findUnique` para Anuncio e User
    prismaMock.anuncio.findUnique = jest.fn().mockResolvedValue(mockAnuncio);
    prismaMock.user.findUnique = jest.fn().mockResolvedValue(null); // Simular usuário inexistente

    // Act & Assert
    await expect(service.getUserFromAnuncio(anuncioId))
      .rejects
      .toThrow('Usuário com ID some-user-id não encontrado');
  });
});
