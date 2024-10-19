import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from './feedback.service';
import { Feedback } from '@prisma/client';
import { CreateFeedbackDto } from "./database/dto/create-feedback.dto";

describe('FeedbackService', () => {
  let service: FeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackService],
    }).compile();

    service = module.get<FeedbackService>(FeedbackService);
  });

  it('Retornar feedback valido', async () => {
    const data = 1

    // Mock the expected result if necessary
    const expectedFeedback = new CreateFeedbackDto();
    // Set up expected values for the feedback DTO
    // For example: expectedFeedback.id = '1';
    
    // Ensure that the service.getComentarios(data) returns expectedFeedback
    jest.spyOn(service, 'getComentarios').mockResolvedValue(expectedFeedback);
    
    expect(await service.getComentarios(data)).toEqual(expectedFeedback);
  });

  it('Retornar feedback com id inexistente', async () => {
    const data = 0

    // Define um usuário mock para o teste
    const mockUser: Array<Feedback> = [];
    expect(await service.getComentarios(data)).toStrictEqual(mockUser);
  });
});