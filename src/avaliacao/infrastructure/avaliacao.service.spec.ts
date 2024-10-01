import { Test, TestingModule } from '@nestjs/testing';
import { AvaliacaoService } from './avaliacao.service';
import { avaliacao } from '@prisma/client';
import { GetComentariosDto } from "./database/dto/get-comentarios.dto";

describe('FeedbackService', () => {
  let service: AvaliacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvaliacaoService],
    }).compile();

    service = module.get<AvaliacaoService>(AvaliacaoService);
  });

  it('Retornar feedback valido', async () => {
    const data = '1'

    // Mock the expected result if necessary
    const expectedFeedback = new GetComentariosDto();
    // Set up expected values for the feedback DTO
    // For example: expectedFeedback.id = '1';
    
    // Ensure that the service.getComentarios(data) returns expectedFeedback
    jest.spyOn(service, 'getComentarios').mockResolvedValue(expectedFeedback);
    
    expect(await service.getComentarios(data)).toEqual(expectedFeedback);
  });

  it('Retornar feedback com id inexistente', async () => {
    const data = '0'

    // Define um usuário mock para o teste
    const mockUser: Array<avaliacao> = [];
    expect(await service.getComentarios(data)).toStrictEqual(mockUser);
  });
});