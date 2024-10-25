import { Test, TestingModule } from '@nestjs/testing';
import { avaliacao } from '@prisma/client';
import { getReservaDto } from './database/dto/get-reserva.dto';
import { GetComentariosDto } from './database/dto/get-comentarios.dto';
import { AnuncioService } from './anuncio.service';

describe('AvaliacaoService', () => {
  let service: AnuncioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnuncioService],
    }).compile();

    service = module.get<AnuncioService>(AnuncioService);
  });

  it('Retornar comentarios com id valido', async () => {
    const data = '1'

    // Mock the expected result if necessary
    const expectedReserva = new getReservaDto();
    // Set up expected values for the feedback DTO
    
    // Ensure that the service.getComentarios(data) returns expectedFeedback
    jest.spyOn(service, 'getComentarioUser').mockResolvedValue(expectedReserva);
    
    expect(await service.getComentarioUser(data)).toEqual(expectedReserva);
  });

  it('Retornar comentarios com id inexistente', async () => {
    const data = '0'

    // Define um usuário mock para o teste
    const mockUser: Object = {
      "message": 'bad request',
      "status": 400
    };
    expect(await service.getComentarioUser(data)).toEqual(mockUser);
  });

  it('Retornar comentarios com id validos', async () => {
    const data = '1'

    // Mock the expected result if necessary
    const expectedReserva = new GetComentariosDto();
    // Set up expected values for the feedback DTO
    
    // Ensure that the service.getComentarios(data) returns expectedFeedback
    jest.spyOn(service, 'getAnuncioHospedeDataMediaAv').mockResolvedValue(expectedReserva);
    
    expect(await service.getAnuncioHospedeDataMediaAv(data)).toEqual(expectedReserva);
  });

  it('Retornar comentarios com id invalido', async () => {
    const data = '0'

    // Define um usuário mock para o teste
    const mockUser: Object = {
      "message": 'bad request',
      "status": 400
    };
  
    // Ensure that the service.getComentarios(data) returns expectedFeedback
    jest.spyOn(service, 'getAnuncioHospedeDataMediaAv').mockResolvedValue(mockUser);
    
    expect(await service.getAnuncioHospedeDataMediaAv(data)).toEqual(mockUser);
  });

  it('Retornar qtd max e min diaria id invalido', async () => {
    const data = '0'

    // Define um usuário mock para o teste
    const mockUser: Object = {
      "message": 'bad request',
      "status": 400
    };
  
    // Ensure that the service.getComentarios(data) returns expectedFeedback
    jest.spyOn(service, 'getQuantMaxEMinDiaria').mockResolvedValue(mockUser);
    
    expect(await service.getQuantMaxEMinDiaria(data)).toEqual(mockUser);
  });

  it('Retornar comentarios com id validos', async () => {
    const data = '1'

    // Mock the expected result if necessary
    const expectedReserva = new GetComentariosDto();
    // Set up expected values for the feedback DTO
    
    // Ensure that the service.getComentarios(data) returns expectedFeedback
    jest.spyOn(service, 'getQuantMaxEMinDiaria').mockResolvedValue(expectedReserva);
    
    expect(await service.getQuantMaxEMinDiaria(data)).toEqual(expectedReserva);
  });

  it('Retornar politica de cancelamento com id validos', async () => {
    const data = '0'

    // Define um usuário mock para o teste
    const mockUser: Object = {
      "message": 'bad request',
      "status": 400
    };
    
    // Ensure that the service.getComentarios(data) returns expectedFeedback
    jest.spyOn(service, 'getPoliticaCancelamento').mockResolvedValue(mockUser);
    
    expect(await service.getPoliticaCancelamento(data)).toEqual(mockUser);
  });

  it('Retornar politica de cancelamento com id invalidos', async () => {
    const data = '1'

    // Mock the expected result if necessary
    const expectedReserva = new Object();
    // Set up expected values for the feedback DTO
    
    // Ensure that the service.getComentarios(data) returns expectedFeedback
    jest.spyOn(service, 'getPoliticaCancelamento').mockResolvedValue(expectedReserva);
    
    expect(await service.getPoliticaCancelamento(data)).toEqual(expectedReserva);
  });
});