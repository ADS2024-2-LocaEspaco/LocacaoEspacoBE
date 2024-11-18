import { Controller, Get, Param, Body } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { anuncio, reserva, usuario } from '@prisma/client';
import { GetComentariosDto } from 'src/anuncio/infrastructure/database/dto/get-comentarios.dto';

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
}

// @Get(':id/:user')
// async getUserFromAnuncio(@Param('id') id: string): Promise<usuario | null> {
//   return this.anuncioService.getUserFromAnuncio(id);
// }
