import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, status_pagamento } from '@prisma/client';
import { HostReservaDados, HostReservasRepository } from '../../host_Repositories/host.reserva.repositories';
import { StatusPagamento, StatusReserva } from 'src/shared/enum/enums';
@Injectable()
export class HostReservasRepo implements HostReservasRepository {
  private prisma = new PrismaClient();

  async getDadosReserva(id_anuncio: number, id_usuario: number): Promise<HostReservaDados[]> {

    const dadosReserva = await this.prisma.reserva.findMany({
   
      where: {
        id_anuncio: id_anuncio,
        id_usuario: id_usuario
      },
      select: {
        id: true,
        id_anuncio: true,
        id_usuario: true,
        qtd_adultos: true,
        qtd_criancas: true,
        qtd_bebes: true,
        qtd_pets: true,
        data_inicial: true,
        data_final: true,
        status_reserva: true,
        status_pagamento: true,
        multa: true,
        cancelamento: true,
        criado_em: true
      }
    })

    
    return dadosReserva.map((dadosReserva) => ({
      id: Number(dadosReserva.id ),
      id_anuncio: Number(dadosReserva.id_anuncio ),
      id_usuario: Number(dadosReserva.id_usuario) ,
      data_inicial: dadosReserva.data_inicial,
      data_final: dadosReserva.data_final ,
      qtd_adultos: Number(dadosReserva.qtd_adultos),
      qtd_criancas: Number(dadosReserva.qtd_criancas ),
      qtd_bebes: Number(dadosReserva.qtd_bebes ),
      qtd_pets: Number(dadosReserva.qtd_pets ),
      status_reserva: dadosReserva.status_reserva as StatusReserva,
      status_pagamento: dadosReserva.status_pagamento as StatusPagamento,
      multa: Number(dadosReserva.multa ),
      cancelamento: Number(dadosReserva.cancelamento ),
      criado_em: dadosReserva.criado_em
    }));
  }

  async atualizarStatusDeReserva(data: {id: number, status_reserva: StatusReserva | null}): Promise<Boolean> {
    
    const statusAtt = await this.prisma.reserva.update({

      where:{
        id: data.id
      },
      data:{
        status_reserva: data.status_reserva
      }
    });

    if(statusAtt.status_reserva === data.status_reserva){

      return true;
    }

    return false;
  }

  async atualizarStatusDePagamento(data: {id: number, status_pagamento:StatusPagamento | null}): Promise<Boolean> {

    const status = data.status_pagamento === StatusPagamento.Conclu_do ? 'Conclu_do' : 'Aguardando';

    const pagamentoAtt = await this.prisma.reserva.update({

      where: {
        id: data.id
      }, 
      data:{
        status_pagamento: status
      }
    })

    if( pagamentoAtt.status_pagamento === status_pagamento.Aguardando || pagamentoAtt.status_pagamento === status_pagamento.Conclu_do ){
      
      return true

    }

    return false;

  }
  
}