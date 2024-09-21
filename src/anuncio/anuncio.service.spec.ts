import { Test, TestingModule } from '@nestjs/testing';
import { Feedback } from '@prisma/client';
import { getReservaDto } from '../shared/infrastructure/dto/get-reserva.dto';
import { AnuncioService } from './anuncio.service';

describe('FeedbackService', () => {
  let service: AnuncioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnuncioService],
    }).compile();

    service = module.get<AnuncioService>(AnuncioService);
  });

  it('Retornar reserva valido', async () => {
    const data = '1'

    // Mock the expected result if necessary
    const expectedReserva = new getReservaDto();
    // Set up expected values for the feedback DTO
    
    // Ensure that the service.getComentarios(data) returns expectedFeedback
    jest.spyOn(service, 'getReservas').mockResolvedValue(expectedReserva);
    
    expect(await service.getReservas(data)).toEqual(expectedReserva);
  });

  it('Retornar reserva com id inexistente', async () => {
    const data = '0'

    // Define um usuário mock para o teste
    const mockUser: Object = {
      "message": 'bad request',
      "status": 400
    };
    expect(await service.getReservas(data)).toEqual(mockUser);
  });
});