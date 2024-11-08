import { Controller, Get, Param, Body, NotFoundException, Post } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { getAnuncioDto } from './database/dto/get-anuncio.dto';
import { getUsuarioDto } from './database/dto/get-anuncio-usuario.dto';
import { createAnuncioDto } from './database/dto/create-anuncio.dto';

@Controller('anuncio')
export class AnuncioController {
  constructor(private readonly anuncioService: AnuncioService) {}

  @Get('reservas')
  async getReservas(@Body('id') id: number): Promise<Object> {
    return await this.anuncioService.getReservas(id);
  }

  @Get(':id/:user')
  async getUserFromAnuncio(@Param('id') id: number): Promise<getUsuarioDto  | null> {
    return this.anuncioService.getUserFromAnuncio(id);
  }

  @Get(':id')
  async getDadosUsuarioAnfitriaoPorIdAnuncio(@Param('id') id: number): Promise<any> {
    const anuncioId = Number(id); // Certifique-se de que `id` é um número

    const anuncio = await this.anuncioService.getAnuncioById(anuncioId); 

    if (!anuncio) {
      throw new NotFoundException('Anúncio não encontrado'); 
    }

    const usuario_id = anuncio.usuario_id; 
    if (!usuario_id) {
      throw new NotFoundException('Usuário não encontrado');  
    }

    const usuario = await this.anuncioService.getUserFromAnuncio(usuario_id); 
    return usuario; 
  }

  @Post()
  async createAnuncio(@Body() anuncio: createAnuncioDto): Promise<createAnuncioDto> {
    return {}
  }
}
