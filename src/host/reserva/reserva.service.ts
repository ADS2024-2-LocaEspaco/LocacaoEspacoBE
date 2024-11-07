import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { HostReservasRepo } from '../database/dto/host.reserva.dto';
import { StatusReserva, StatusPagamento } from 'src/shared/enum/enums';


@Injectable()
export class ReservaService {
  constructor(private readonly reserva: HostReservasRepo) { }

  async getReservas(id_anuncio: number, id_usuario: number) {
    try {

      console.log('passando em getReserva');

      const result = await this.reserva.getDadosReserva(id_anuncio, id_usuario);

      if (!result || result.length === 0) {

        throw new NotFoundException('Reservas não encontradas');

      }

      return result;

    } catch (err) {

      if (err instanceof NotFoundException) {

        throw err
      }

      console.error(' Código do erro: ' + err);

      throw new BadRequestException('Erro ao buscar por reservas!');
    }
  }

  async attStatusReserva(data: {id: number, status_reserva: number} ) {

    const { id, status_reserva} = data;
    
    const resultadoAttStatusReserva = await this.reserva.atualizarStatusDeReserva(id, status_reserva);

    return resultadoAttStatusReserva


  }

  async attPagamento(dados: { id: number, status_pagamento: number }) {
    
    const { id, status_pagamento } = dados
    
    const resul = await this.reserva.atualizarStatusDePagamento(id, status_pagamento)

    return resul

  }

  async getHistorico(status: number, de: Date, ate: Date) {

      const inicial = new Date(de)
      const final = new Date(ate)

      const res = await this.reserva.getHistorico(status, inicial, final)

  }

  async aceitarNegarReservas(status: number, id_reserva: number, id_usuario: number) {

    const result = await this.reserva.aceitarNegarReservas(status, id_reserva, id_usuario);

    if (!result) {

      throw new BadRequestException('Falha ao realizar a operação de aceitar/Negar reserva')

    }

    return result

  }
}

