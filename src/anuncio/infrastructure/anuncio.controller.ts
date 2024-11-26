import { Controller, Get, Param, Body, NotFoundException } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { anuncio, reserva, usuario } from '@prisma/client';
import { GetComentariosDto } from 'src/anuncio/infrastructure/database/dto/get-comentarios.dto';
import { getAnuncioDto } from './database/dto/get-anuncio.dto';
import { getUsuarioDto } from './database/dto/get-anuncio-usuario.dto';
import { getComodidadesAnuncioDto } from './database/dto/get-comodidade-anuncio.dto';
import { getAnuncioFotosDto } from './database/dto/get-anuncio-fotos.dto';

@Controller('anuncio')
export class AnuncioController {
  constructor(
    private readonly anuncioService: AnuncioService,
  ) {}
  
  @Get('comentarios')
  async getComentarioUser(@Body('id') data: any): Promise<GetComentariosDto[] | object> {
    return this.anuncioService.getComentarioUser(data);
  }
  
  @Get('media-avaliacao/data-reservas')
  async getAnuncioHospedeDataMediaAv(@Body('id') id: string): Promise<Object> {
    return await this.anuncioService.getAnuncioHospedeDataMediaAv(id);
  }

  @Get('qtd-max-min-diaria')
  async getQuantMaxEMinDiaria(@Body('id') id: string): Promise<Object> {
    return await this.anuncioService.getQuantMaxEMinDiaria(id);
  }

  @Get('politica-cancelamento')
  async getPoliticaCancelamento(@Body('id') id: string): Promise<Object> {
    return await this.anuncioService.getPoliticaCancelamento(id);
  }

  @Get(':id')
  async getAnuncio(@Param('id') id: string): Promise<anuncio | object> {
    return this.anuncioService.getAnuncio(id);
  }

  @Get(':id/:user')
  async getUserFromAnuncio(@Param('id') id: number): Promise<getUsuarioDto | null> {
    return this.anuncioService.getUserFromAnuncio(id);
  }

  @Get('comodidades/:id')
  async getComodidadesByAnuncioId(@Param('id') id: number): Promise<getComodidadesAnuncioDto[] | null> {
    const anuncioId = Number(id); 

    const comodidades = await this.anuncioService.getComodidadesByAnuncioId(id);

    if (!comodidades) {
      throw new NotFoundException('comodidade não encontrada');
    }
    return comodidades;
  }

  @Get('usuario/:id')
  async getDadosUsuarioAnfitriaoPorIdAnuncio(@Param('id') id: number): Promise<any> {
      const anuncio = await this.anuncioService.getAnuncioById(id); 

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
  
  @Get('fotos/:id')
  async getFotosByAnuncioId(@Param('id') id: number): Promise<getAnuncioFotosDto[] | null> {
    const anuncioId = Number(id); 

    const fotos = await this.anuncioService.getFotosByAnuncioId(id);

    if (!fotos) {
      return null;
    }

    return fotos;
  }

  @Get('reservas')
  async getReservas(@Body('id') id: number): Promise<Object> {
    return await this.anuncioService.getReservas(id);
  }

}
