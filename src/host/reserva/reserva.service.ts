import { Injectable, NotFoundException } from '@nestjs/common';
import { HostReservasRepo } from '../host_Repositories/host.repository';

@Injectable()
export class ReservaService {
  constructor(private readonly reserva: HostReservasRepo){}

  async getRervas(id_anuncio: number, id_usuario: number){
    try{
      const result = await this.reserva.getDadosReserva(id_anuncio, id_usuario);

      if(result && result.length > 0){
       
        return result

      }else{
        throw new NotFoundException({
          error: 'Reservas não encontradas!'
        });
      }
    }catch (err) {
      if(err instanceof NotFoundException) {
        throw err;
      }

      console.error(' Código do erro: ' + err);

      throw new Error('Erro ao buscar por reservas!');
    }
  }
}

