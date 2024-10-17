import { Test, TestingModule } from '@nestjs/testing';
import { ReservaService } from '../reserva.service'
import { HostReservasRepo } from '../../database/dto/host.reserva.dto';


describe('Teste do Host Service: recebendo ID e enviando qtd suportadas a este ID', () => {
  let service: ReservaService;
  let repository: HostReservasRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservaService, HostReservasRepo],
    }).compile();

    repository = module.get<HostReservasRepo>(HostReservasRepo);
    service = module.get<ReservaService>(ReservaService);
  });

  it('Testando o retorno de ', async () => {
    const mockReservas = [
      {
        id: 1,
        anuncio_id: 1,
        usuario_id: 1,
        data_inicial: new Date('2024-10-15'),
        data_final: new Date('2024-10-20'),
        num_adultos: 1,
        num_criancas: 1,
        num_bebes: 1,
        num_pets: 1,
        valor_reserva: 1,
        num_cartao: 1,
        checkin: 1,
        checkout: 1,
        status_reserva: 1,
        status_pagamento: 1,
        multa: 1,
        cancelamento: 1,
        solicitante_cancelamento: 1,
        criado_em: new Date('2024-10-15 15:23:40.000000')
      },
    ];

    jest.spyOn(service, 'getReservas').mockResolvedValue(mockReservas);

    const result = await service.getReservas(1, 1);

    expect(result).toBeDefined();
    expect(result?.length).toBeGreaterThan(0);

    expect(result![0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        anuncio_id: expect.any(Number),
        usuario_id: expect.any(Number),
        data_inicial: expect.any(Date),
        data_final: expect.any(Date),
        num_adultos: expect.any(Number || null),
        num_criancas: expect.any(Number || null),
        num_bebes: expect.any(Number || null),
        num_pets: expect.any(Number || null),
        valor_reserva: expect.any(Number || null),
        num_cartao: expect.any(Number || null),
        checkin: expect.any(Number || null),
        checkout: expect.any(Number || null),
        status_reserva: expect.any(Number || null),
        status_pagamento: expect.any(Number || null),
        multa: expect.any(Number || null),
        cancelamento: expect.any(Number || null),
        solicitante_cancelamento: expect.any(Number || null),
        criado_em: expect.any(Date)
      }),
    );

    expect(service).toBeDefined();
  });
});
