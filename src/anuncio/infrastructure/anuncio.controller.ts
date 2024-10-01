import { Controller, Get, Param, Body } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { anuncio, reservas, usuario } from '@prisma/client';
import { GetComentariosDto } from 'src/avaliacao/infrastructure/database/dto/get-comentarios.dto';
import { AvaliacaoService } from 'src/avaliacao/infrastructure/avaliacao.service';

@Controller('anuncio')
export class AnuncioController {
  constructor(
    private readonly anuncioService: AnuncioService,
    private readonly avaliacaoService: AvaliacaoService
  ) {}

  
  @Get('comentarios')
  async getComentarioUser(@Body('id') data: any): Promise<any[]> {
    return this.anuncioService.getComentarioUser(data);
  }
  
}
// @Get('reservas')
// async getReservas(@Body('id') id: string): Promise<Object> {
//   return await this.anuncioService.getReservas(id);
// }

// @Get(':id')
// async getAnuncioById(@Param('id') id: string): Promise<anuncio | null> {
//   return this.anuncioService.getAnuncioById(id);
// }

// @Get(':id/:user')
// async getUserFromAnuncio(@Param('id') id: string): Promise<usuario | null> {
//   return this.anuncioService.getUserFromAnuncio(id);
// }
