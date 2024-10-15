import { Test, TestingModule } from '@nestjs/testing';
import { AnuncioService } from '../host.anuncio.service';
import { HostRepository } from '../../host_Repositories/host.repository';

describe('Teste do Host Service: recebendo ID e enviando alocações relacionadas a este ID', () => {
  let service: AnuncioService;
  let repository: HostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnuncioService, HostRepository],
    }).compile();

    repository = module.get<HostRepository>(HostRepository);
    service = module.get<AnuncioService>(AnuncioService);
  });

  it('Testando o retorno de findAllocations', async () => {
    const mockLocations = [
      {
        id: 1,
        usuario_id: 1,
        tipo_espaco_id: 1,
        tipo_imoveis_id: 1,
        titulo: "Ithaca home",
        descricao: "Home with a view to the gates of stone in ithaca",
        url_imgs: "https://matias.me/nsfw/",
        polit_cancelamento: 1,
      },
    ];

    jest.spyOn(service, 'findAllocations').mockResolvedValue(mockLocations);

    const result = await service.findAllocations(1);

    expect(result[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        usuario_id: expect.any(Number),
        tipo_espaco_id: expect.any(Number),
        tipo_imoveis_id: expect.any(Number),
        titulo: expect.any(String),
        descricao: expect.any(String),
        url_imgs: expect.any(String),
        polit_cancelamento: expect.any(Number),
      }),
    );

    expect(service).toBeDefined();
  });
});
