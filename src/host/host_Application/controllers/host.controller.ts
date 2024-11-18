import { Controller, Get, Put, Query } from '@nestjs/common';
import { ReservaValidator, DadosDeAttStatus, HistoricoDados, DadosNegarAceitar } from 'src/host/database/validator/host.validator.dto';
import { ReservaService } from 'src/host/reserva/reserva.service';

@Controller('reservas')
export class HostReservas {
  constructor(private readonly reservas: ReservaService) { }

  @Get()
  async getReservas(@Query() query: ReservaValidator) {

    const { id_anuncio, id_usuario } = query;

    const result = await this.reservas.getReservas(id_anuncio, id_usuario);

    return result;
  }

  // @Put('pagamento')
  // async attPagamento(@Query() query: DadosDeAttStatus) {

  //   const data = {

  //     id: Number(query.id),
  //     status_pagamento: Number(query.status)

  //   };


  //   const result = await this.reservas.attPagamento(data)

  //   return result;

  // }

  @Put('statusReserva')
  async attReservas(@Query() query: DadosDeAttStatus) {

    const data = {

      id: query.id,
      status_reserva: query.status

    };

    const result = await this.reservas.attStatusReserva(data);

    return result;

  }

  @Get('historico')
  async getHistoricosReserva(@Query() query: HistoricoDados) {

    const { status_reserva, dataInicial, dataFinal } = query

    const result = await this.reservas.getHistorico(status_reserva, dataInicial, dataFinal)


    return result;
  }

  @Put('aceite')
  async attAceite(@Query() query: DadosNegarAceitar) {

    const { status_aceite, id_reserva, id_usuario } = query

    const result = await this.reservas.aceitarNegarReservas(status_aceite, id_reserva, id_usuario);



    return result
  }
}