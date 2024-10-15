import { Controller, Get, Query } from '@nestjs/common';
import { AnuncioService } from '../../anuncio/host.anuncio.service';
import { HostQueryDto } from '../../database/dto/host.id.dto';
import { ReservaDto } from '../../database/dto/host.reserva.dto';
import { ReservaService } from 'src/host/reserva/reserva.service';
@Controller('anuncio')
export class HostController {
  constructor(private readonly host: AnuncioService) {}

  @Get()
  async getHostAllocations(@Query() query: HostQueryDto) {
    const { id } = query;

    const result = await this.host.findAllocations(id);

    return result;
  }

  @Get('obrigatorios')
  async getObrigatorios(@Query() query: HostQueryDto){
    const { id } = query;
    
    const result = await this.host.getAttrNaoObrigatorios(id);

    return result;
  }

  @Get('qtd')
  async getQtds(@Query() query: HostQueryDto) {
    const { id } = query;

    const result = await this.host.getQtdSuportada(id);

    return result;
  }

  @Get('permissoes')
  async getPermissoes(@Query() query: HostQueryDto) {
    const { id } = query;

    const result = await this.host.getPermissoes(id);

    return result;
  }

  @Get('checks')
  async getCheckInOut(@Query() query: HostQueryDto) {
    const { id } = query;

    const result = await this.host.getCheckInOut(id);

    return result;
  }

  @Get('valores')
  async getValores(@Query() query: HostQueryDto) {
    const { id } = query;

    const result = await this.host.getValores(id);

    return result;
  }

}

@Controller('reservas')
export class HostReservas {
  constructor(private readonly reservas: ReservaService){}

  @Get()
  async getReservas(@Query() query: ReservaDto) {

    const { id_anuncio, id_usuario } = query;

    const result = await this.reservas.getRervas(id_anuncio, id_usuario);

    return result;
  }
}