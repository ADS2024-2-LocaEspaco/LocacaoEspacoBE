import { Controller, Get, Put, Query } from '@nestjs/common';
import { ValidadorParaIdReserva, ValidadorParaDadosDeHistorico } from 'src/host/database/validator/validator.retorno.de.dados';
import { ValidadorParaAtualizarStatusDeReserva, ValidadorParaAtualizarStatusDeAceiteReserva } from 'src/host/database/validator/validator.atualizacao.de.dados';
import { ReservaService } from 'src/host/reserva/reserva.service';

@Controller('reservas')
export class HostReservas {
  constructor(private readonly reservas: ReservaService) { }

  @Get()
  async getReservas(@Query() query: ValidadorParaIdReserva) {

    const { id_anuncio, id_usuario } = query;

    const result = await this.reservas.getReservas(id_anuncio, id_usuario);

    return result;
  }

  @Put('statusReserva')
  async attReservas(@Query() query: ValidadorParaAtualizarStatusDeReserva) {

    const data = {

      id: query.id,
      status_reserva: query.status

    };

    const result = await this.reservas.attStatusReserva(data);

    return result;

  }

  @Get('historico')
  async getHistoricosReserva(@Query() query: ValidadorParaDadosDeHistorico) {

    const { status_reserva, dataInicial, dataFinal } = query

    const result = await this.reservas.getHistorico(status_reserva, dataInicial, dataFinal)


    return result;
  }

  @Put('aceite')
  async attAceite(@Query() query: ValidadorParaAtualizarStatusDeAceiteReserva) {

    const { status_aceite, id_reserva, id_usuario } = query

    const result = await this.reservas.aceitarNegarReservas(status_aceite, id_reserva, id_usuario);

    return result
  }
}