import { Test, TestingModule } from '@nestjs/testing';
import { AnuncioService } from '../host.anuncio.service';
import { HostRepository } from '../../host_Repositories/host.repository';


describe('Teste do Host Service: recebendo ID e enviando qtd suportadas a este ID', () => {
  let service: AnuncioService;
  let repository: HostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnuncioService, HostRepository],
    }).compile();

    repository = module.get<HostRepository>(HostRepository);
    service = module.get<AnuncioService>(AnuncioService);
  });

  it('Testando o retorno de getValores', async () => {
    const mockQtd = [
      {
        valor_diaria: "450E",
        quant_diaria_min: 380,
        quant_diaria_max: 600,
      },
    ];
    true
    jest.spyOn(service, 'getValores').mockResolvedValue(mockQtd);

    const result = await service.getValores(1);

    expect(result[0]).toEqual(
      expect.objectContaining({
        valor_diaria:expect.any(String),
        quant_diaria_min: expect.any(Number || null),
        quant_diaria_max: expect.any(Number || null),
      }),
    );

    expect(service).toBeDefined();
  });
});
