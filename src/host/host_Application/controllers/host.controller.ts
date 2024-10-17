import { Controller, Get, Put, Query } from '@nestjs/common';
import { AnuncioService } from '../../anuncio/host.anuncio.service';
import { ReservaValidator, AnuncioValidator, DadosDeAttStatus } from 'src/host/database/validator/host.validator.dto';
import { ReservaService } from 'src/host/reserva/reserva.service';
import { queryObjects } from 'v8';
@Controller('anuncio')
export class HostController {
  constructor(private readonly host: AnuncioService) {}

  @Get()
  async getHostAllocations(@Query() query: AnuncioValidator) {
    const { id } = query;

    const result = await this.host.findAllocations(id);

    return result;
  }

  @Get('obrigatorios')
  async getObrigatorios(@Query() query: AnuncioValidator){
    const { id } = query;
    
    const result = await this.host.getAttrNaoObrigatorios(id);

    return result;
  }

  @Get('qtd')
  async getQtds(@Query() query: AnuncioValidator) {
    const { id } = query;

    const result = await this.host.getQtdSuportada(id);

    return result;
  }

  @Get('permissoes')
  async getPermissoes(@Query() query: AnuncioValidator) {
    const { id } = query;

    const result = await this.host.getPermissoes(id);

    return result;
  }

  @Get('checks')
  async getCheckInOut(@Query() query: AnuncioValidator) {
    const { id } = query;

    const result = await this.host.getCheckInOut(id);

    return result;
  }

  @Get('valores')
  async getValores(@Query() query: AnuncioValidator) {
    const { id } = query;

    const result = await this.host.getValores(id);

    return result;
  }

}

@Controller('reservas')
export class HostReservas {
  constructor(private readonly reservas: ReservaService){}

  @Get()
  async getReservas(@Query() query: ReservaValidator) {

    const { id_anuncio, id_usuario } = query;

    const result = await this.reservas.getReservas(id_anuncio, id_usuario);

    return result;
  }

  @Put('pagamento')
  async attReservas(@Query() query: DadosDeAttStatus) {

    const data = { 
      id: query.id, 
      status_pagamento: query.status
    };

    const result = await this.reservas.attPagamento(data)

    return result;
  }

}