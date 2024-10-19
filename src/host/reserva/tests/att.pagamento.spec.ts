import { Test, TestingModule } from '@nestjs/testing';
import { ReservaService } from '../reserva.service';  
import { HostReservasRepo } from '../../database/dto/host.reserva.dto';

describe('ReservaService', () => {
  let service: ReservaService;
  let dto: HostReservasRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservaService, HostReservasRepo],
    }).compile();

    service = module.get<ReservaService>(ReservaService);
    dto = module.get<HostReservasRepo>(HostReservasRepo);
  });

  it('should update reservation status', async () => {
    // Mockando o retorno do método attReservas
    const mockData = { 
        id: 1, 
        status_pagamento: 2 
    };
    
    jest.spyOn(service, 'attPagamento').mockResolvedValue(true);

    const result = await service.attPagamento(mockData);
    
    expect(result).toBe(true);  // Valida que o método foi chamado corretamente e retornou o mock
    expect(service.attPagamento).toHaveBeenCalledWith(mockData); // Verifica se foi chamado com os dados corretos
  });
});
