import { Controller, Get, Param, Body } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import * as client from '@prisma/client';
import { getAnuncioDto } from './database/dto/get-anuncio.dto';
import { getUsuarioDto } from './database/dto/get-anuncio-usuario.dto';

@Controller('anuncio')
export class AnuncioController {
  constructor(private readonly anuncioService: AnuncioService) {}

  @Get('reservas')
  async getReservas(@Body('id') id: number): Promise<Object> {
    return await this.anuncioService.getReservas(id);
  }


  @Get(':id')
  async getDadosUsuarioAnfitriaoPorIdAnuncio(@Param('id') id: number): Promise<any> {
      const anuncioId = Number(id); 
      const anuncio = await this.anuncioService.getAnuncioById(anuncioId); 
  
      if (!anuncio) {
          return null; 
      }
  
      const usuario_id = anuncio.usuario_id; 
      if (!usuario_id) {
          return null; 
      }
  
      const usuario = await this.anuncioService.getUserFromAnuncio(usuario_id); 
  
      return usuario; 
  }
  
  
}
