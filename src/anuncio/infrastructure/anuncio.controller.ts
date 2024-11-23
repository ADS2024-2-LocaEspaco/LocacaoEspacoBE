import { Controller, Get, Param, Body, NotFoundException } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { getAnuncioDto } from './database/dto/get-anuncio.dto';
import { getUsuarioDto } from './database/dto/get-anuncio-usuario.dto';
import { getComodidadesAnuncioDto } from './database/dto/get-comodidade-anuncio.dto';
import { getAnuncioFotosDto } from './database/dto/get-anuncio-fotos.dto';

@Controller('anuncio')
export class AnuncioController {
  constructor(private readonly anuncioService: AnuncioService) { }

  @Get('user/:id')
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

   @Get('comodidades/:id')
  async getComodidadesByAnuncioId(@Param('id') id: number): Promise<getComodidadesAnuncioDto[] | null> {
    const anuncioId = Number(id); // Certifique-se de que `id` é um número

    const comodidades = await this.anuncioService.getComodidadesByAnuncioId(id);

    if (!comodidades) {
      throw new NotFoundException('comodidade não encontrada');
    }
    console.log(comodidades)

    return comodidades;
  }

  
  @Get('fotos/:id')
  async getFotosByAnuncioId(@Param('id') id: number): Promise<getAnuncioFotosDto[] | null> {
    const anuncioId = Number(id); 

    const fotos = await this.anuncioService.getFotosByAnuncioId(id);

    if (!fotos) {
      return null;
    }
    console.log(fotos)

    return fotos;
  }


  @Get('reservas')
  async getReservas(@Body('id') id: number): Promise<Object> {
    return await this.anuncioService.getReservas(id);
  }

  @Get(':id/:user')
  async getUserFromAnuncio(@Param('id') id: number): Promise<getUsuarioDto | null> {
    return this.anuncioService.getUserFromAnuncio(id);
  }

  
 


}

