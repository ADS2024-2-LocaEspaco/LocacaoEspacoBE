import { Test, TestingModule } from '@nestjs/testing';
import { HostService } from './host.service';
import { HostRepository } from './host_Repositories/host.repository';


describe('Teste do Host Service: recebendo ID e enviando alocações relacionadas a este ID', () => {
  let service: HostService;
  let repository: HostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HostService, HostRepository]
      
    }).compile();

    repository = module.get<HostRepository>(HostRepository);
    service = module.get<HostService>(HostService);
  });

  it('Testando o retorno de findAllocations', async () => {
    
    const mockLocations = [{
      id: '1',
      title: 'Rua Oráculo',
      address: 'Odyssey Ithaca',
      description: 'Triumphant Champion of Ithaca',
      userId: '383d9a17-6957-11ef-ad98-e865381af6f3',
      qtdMaxHospedes: '3'
    }];

    jest.spyOn(service, 'findAllocations').mockResolvedValue(mockLocations);

    const result = await service.findAllocations('383d9a17-6957-11ef-ad98-e865381af6f3')

    expect(result[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        address: expect.any(String),
        description: expect.any(String),
        userId: expect.any(String),
        qtdMaxHospedes: expect.any(String)
      })
    )

    expect(service).toBeDefined();
  });
});