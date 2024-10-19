import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HostReservaDados, HostReservasRepository } from '../../host_Repositories/host.reserva.repositories';
@Injectable()
export class HostReservasRepo implements HostReservasRepository {
  private prisma = new PrismaClient();

  async getDadosReserva(id_anuncio: number, id_usuario: number): Promise<HostReservaDados[]> {
    const dadosReserva = await this.prisma.reservas.findMany({
      where: {
        anuncio_id: id_anuncio,
        usuario_id: id_usuario
      },
      select: {
        id: true,
        anuncio_id: true,
        usuario_id: true,
        data_inicial: true,
        data_final: true,
        num_adultos: true,
        num_criancas: true,
        num_bebes: true,
        num_pets: true,
        valor_reserva: true,
        num_cartao: true,
        checkin: true,
        checkout: true,
        status_reserva: true,
        status_pagamento: true,
        multa: true,
        cancelamento: true,
        solicitante_cancelamento: true,
        criado_em: true
      }
    })

    
    return dadosReserva.map((dadosReserva) => ({
      id: Number(dadosReserva.id ),
      anuncio_id: Number(dadosReserva.anuncio_id ),
      usuario_id: Number(dadosReserva.usuario_id) ,
      data_inicial: dadosReserva.data_inicial,
      data_final: dadosReserva.data_final ,
      num_adultos: Number(dadosReserva.num_adultos ),
      num_criancas: Number(dadosReserva.num_criancas ),
      num_bebes: Number(dadosReserva.num_bebes ),
      num_pets: Number(dadosReserva.num_pets ),
      valor_reserva: Number(dadosReserva.valor_reserva ),
      num_cartao: Number(dadosReserva.num_cartao ),
      checkin: Number(dadosReserva.checkin ),
      checkout: Number(dadosReserva.checkout ),
      status_reserva: Number(dadosReserva.status_reserva ),
      status_pagamento: Number(dadosReserva.status_pagamento ),
      multa: Number(dadosReserva.multa ),
      cancelamento: Number(dadosReserva.cancelamento ),
      solicitante_cancelamento: Number(dadosReserva.solicitante_cancelamento ),
      criado_em: dadosReserva.criado_em
    }));
  }

  async atualizarStatusDeReserva(data: {id: number, status_reserva: number}): Promise<Boolean> {
    
    const statusAtt = await this.prisma.reservas.update({

      where:{
        id: data.id
      },
      data:{
        status_reserva: data.status_reserva
      }
    });

    if(Number(statusAtt.status_reserva) === data.status_reserva){

      return true;
    }

    return false;
  }

  async atualizarStatusDePagamento(data: {id: number, status_pagamento:number}): Promise<Boolean> {

    const pagamentoAtt = await this.prisma.reservas.update({

      where: {
        id: data.id
      }, 
      data:{
        status_pagamento: data.status_pagamento
      }
    })

    if(Number(pagamentoAtt.status_pagamento) === data.status_pagamento){
      
      return true;
    }

    return false;
  }
  
}