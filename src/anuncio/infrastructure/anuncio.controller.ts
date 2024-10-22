import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { getAnuncioDto } from './database/dto/get-anuncio.dto';
import { getUsuarioDto } from './database/dto/get-anuncio-usuario.dto';
import CreateAnuncioDto from './database/dto/create-anuncio.dto';

@Controller('anuncio')
export class AnuncioController {
  constructor(private readonly anuncioService: AnuncioService) {}

  @Get('reservas')
  async getReservas(@Body('id') id: number): Promise<Object> {
    return await this.anuncioService.getReservas(id);
  }

  @Get(':id')
  async getAnuncioById(@Param('id') id: number): Promise<getAnuncioDto  | null> {
    return this.anuncioService.getAnuncioById(id);
  }

  @Get(':id/user')
  async getUserFromAnuncio(@Param('id') id: number): Promise<getUsuarioDto  | null> {
    return this.anuncioService.getUserFromAnuncio(id);
  }

  @Post()
  create(@Body() createAnuncioDto: CreateAnuncioDto) {
    return this.anuncioService.create(createAnuncioDto);
  }
}
