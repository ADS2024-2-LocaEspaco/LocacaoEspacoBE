import { Controller, Get, Param, Body } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { anuncio, reserva, usuario } from '@prisma/client';

@Controller('anuncio')
export class AnuncioController {
  constructor(private readonly anuncioService: AnuncioService) {}
/*
  @Get('reservas')
  async getReservas(@Body('id') id: string): Promise<Object> {
    return await this.anuncioService.getReservas(id);
  }

  @Get(':id')
  async getAnuncioById(@Param('id') id: string): Promise<anuncio | null> {
    return this.anuncioService.getAnuncioById(id);
  }

  @Get(':id/:user')
  async getUserFromAnuncio(@Param('id') id: string): Promise<usuario | null> {
    return this.anuncioService.getUserFromAnuncio(id);
  }*/
}
