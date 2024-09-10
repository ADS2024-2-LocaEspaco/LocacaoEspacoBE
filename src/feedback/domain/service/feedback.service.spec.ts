import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from './feedback.service';
import { Feedback } from '@prisma/client';
import { CreateFeedbackDto } from 'src/feedback/infrastructure/dto/create-feedback.dto';

describe('FeedbackService', () => {
  let service: FeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackService],
    }).compile();

    service = module.get<FeedbackService>(FeedbackService);
  });

  it('Retornar feedback valido', async () => {
    const data = '1'

    // Define um usuário mock para o teste
    const mockUser: CreateFeedbackDto[] = [{
      id: '1',
      descricao: 'muito bom',
      nota: 10,
      anuncioId: '1',
      userId: '1',
    }];
    expect(await service.getComentarios(data)).toStrictEqual(mockUser);
  });

  it('Retornar feedback com id inexistente', async () => {
    const data = '0'

    // Define um usuário mock para o teste
    const mockUser: Array<Feedback> = [];
    expect(await service.getComentarios(data)).toStrictEqual(mockUser);
  });
});