import { Test, TestingModule } from '@nestjs/testing';
import { AnuncioService } from '../host.anuncio.service';
import { AnuncioRepository } from '../../database/dto/host.anuncio.dto';

describe('Teste do Host Service: recebendo ID e enviando dados de chekin/out a este ID', () => {
  let service: AnuncioService;
  let repository: AnuncioRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnuncioService, AnuncioRepository],
    }).compile();

    repository = module.get<AnuncioRepository>(AnuncioRepository);
    service = module.get<AnuncioService>(AnuncioService);
  });

  it('Testando o retorno de getCheckInOut', async () => {
    const mockChecks = [
      {
        checkin_inicio: new Date('13:30:12.123456'),
        checkin_fim: new Date('14:31:40.654312'),
        checkout: new Date('13:31:42.123450'),
      },
    ];

    jest.spyOn(service, 'getCheckInOut').mockResolvedValue(mockChecks);

    const result = await service.getCheckInOut(1);

    expect(result[0]).toEqual(
      expect.objectContaining({
        checkin_inicio: expect.any(Date),
        checkin_fim: expect.any(Date),
        checkout: expect.any(Date),
      }),
    );

    expect(service).toBeDefined();
  });
});
