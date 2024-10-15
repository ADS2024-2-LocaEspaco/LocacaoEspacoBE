import { Test, TestingModule } from '@nestjs/testing';
import { AnuncioService } from '../host.anuncio.service';
import { HostRepository } from '../../host_Repositories/host.repository';

describe('Teste do Host Service: recebendo ID e enviando dados não obrigatóros a este ID', () => {
  let service: AnuncioService;
  let repository: HostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnuncioService, HostRepository],
    }).compile();

    repository = module.get<HostRepository>(HostRepository);
    service = module.get<AnuncioService>(AnuncioService);
  });

  it('Testando o retorno de getAttrNaoObrigatorios', async () => {
    const mockeNObrigatórios = [
      {
        cftv: true,
        monitoramento_ruido: true,
        armas: true,
        aprovacao_reserva: true,
        horario_silencio: true,
        horario_silencio_inicio: new Date('22:00:00:00'),
        horario_silencio_fim: new Date('07:30:00:00'),
        fotografia_comercial: true,
        regras_adicionais: "proibido pessoas chatas, animais e militantes",
        criado_em: new Date('2024-10-14 15:31:21'),
        publicado: true,
        temp_antec_reserva: 2,
      },
    ];

    jest.spyOn(service, 'getAttrNaoObrigatorios').mockResolvedValue(mockeNObrigatórios);

    const result = await service.getAttrNaoObrigatorios(1);

    expect(result[0]).toEqual(
      expect.objectContaining({
        cftv: expect.any(Boolean || null),
        monitoramento_ruido: expect.any(Boolean || null),
        armas:  expect.any(Boolean || null),
        aprovacao_reserva:  expect.any(Boolean || null),
        horario_silencio:  expect.any(Boolean || null),
        horario_silencio_inicio: expect.any(Date),
        horario_silencio_fim: expect.any(Date),
        fotografia_comercial:  expect.any(Boolean || null),
        regras_adicionais: expect.any(String),
        criado_em: expect.any(Date),
        publicado:  expect.any(Boolean || null),
        temp_antec_reserva: expect.any(Number || null),
      }),
    );

    expect(service).toBeDefined();
  });
});
