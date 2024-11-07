import { Test, TestingModule } from '@nestjs/testing';
import { AnuncioService } from '../host.anuncio.service';
import { AnuncioRepository } from '../../database/dto/host.anuncio.dto';

describe('Teste do Host Service: recebendo ID e enviando permissoes a este ID', () => {
  let service: AnuncioService;
  let repository: AnuncioRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnuncioService, AnuncioRepository],
    }).compile();

    repository = module.get<AnuncioRepository>(AnuncioRepository);
    service = module.get<AnuncioService>(AnuncioService);
  });

  it('Testando o retorno de getPermissoes', async () => {
    const mockPermissoes = [
      {
        aceita_crianca: true,
        aceita_bebe: true,
        aceita_pet: true,
        quant_pet: 1,
        permite_eventos: true,
        permite_fumar: true,
      },
    ];

    jest.spyOn(service, 'getPermissoes').mockResolvedValue(mockPermissoes);

    const result = await service.getPermissoes(1);

    expect(result[0]).toEqual(
      expect.objectContaining({
        aceita_crianca: expect.any(Boolean || null),
        aceita_bebe: expect.any(Boolean || null),
        aceita_pet: expect.any(Boolean || null),
        quant_pet: expect.any(Number || null),
        permite_eventos: expect.any(Boolean || null),
        permite_fumar: expect.any(Boolean || null),
      }),
    );

    expect(service).toBeDefined();
  });
});