import { Injectable, NotFoundException } from '@nestjs/common';
import { HostRepository } from './host_Repositories/host.repository';

@Injectable()
export class HostService {
  constructor(private readonly locations: HostRepository) {}

  async findAllocations(id: number) {
    try {
      const result = await this.locations.getAnuncioLocations(id);

      console.log(result);

      if (result && result.length > 0) {
        return result;
      } else {
        throw new NotFoundException({
          error: 'Anúncios não encontrados para este usuário',
        });
      }
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }

      console.error(' Código do erro: ' + err);

      throw new Error('Erro ao buscar alocações');
    }
  }
}
