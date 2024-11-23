import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AnuncioService } from 'src/anuncio/infrastructure/anuncio.service';

@Controller('home')
export class AnuncioMaisReservadosController {
  constructor(private readonly anuncioService: AnuncioService) {}

  @Get('/')
  async getAnunciosMaisReservados(@Req() req: Request, @Res() res: Response) {
    const anunciosMaisReservados = await this.anuncioService.getAnunciosMaisReservados();

    res.status(200).send(anunciosMaisReservados);
  }
}
