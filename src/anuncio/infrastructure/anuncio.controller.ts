import { Controller, Get, Param, Body } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { Anuncio, Reserva, User } from '@prisma/client';

@Controller('anuncio')
export class AnuncioController {
  constructor(private readonly anuncioService: AnuncioService) {}

  @Get('reservas')
  async getReservas(@Body('id') id: string): Promise<Object> {
    return await this.anuncioService.getReservas(id);
  }

  @Get(':id')
  async getAnuncioById(@Param('id') id: string): Promise<Anuncio | null> {
    return this.anuncioService.getAnuncioById(id);
  }

  @Get(':id/:user')
  async getUserFromAnuncio(@Param('id') id: string): Promise<User | null> {
    return this.anuncioService.getUserFromAnuncio(id);
  }
}
