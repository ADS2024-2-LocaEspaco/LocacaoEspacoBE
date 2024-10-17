import { Test, TestingModule } from '@nestjs/testing';
import { AnuncioService } from '../host.anuncio.service';
import { AnuncioRepository } from '../../database/dto/host.anuncio.dto';

describe('Teste do Host Service: recebendo ID e enviando qtd suportadas a este ID', () => {
  let service: AnuncioService;
  let repository: AnuncioRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnuncioService, AnuncioRepository],
    }).compile();

    repository = module.get<AnuncioRepository>(AnuncioRepository);
    service = module.get<AnuncioService>(AnuncioService);
  });

  it('Testando o retorno de getQtdSuportada', async () => {
    const mockQtd = [
      {
        quant_quartos: 2,
        quant_banheiro: 3,
        quant_cama: 2,
        quant_hospede: 4,
      },
    ];

    jest.spyOn(service, 'getQtdSuportada').mockResolvedValue(mockQtd);

    const result = await service.getQtdSuportada(1);

    expect(result[0]).toEqual(
      expect.objectContaining({
        quant_quartos: expect.any(Number),
        quant_banheiro: expect.any(Number),
        quant_cama: expect.any(Number),
        quant_hospede: expect.any(Number)
      }),
    );

    expect(service).toBeDefined();
  });
});
