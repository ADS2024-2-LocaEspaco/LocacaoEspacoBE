import { Controller, Get, Req, Res } from '@nestjs/common';
import { AnuncioService } from 'src/anuncio/infrastructure/anuncio.service';
import { Request, Response } from 'express';

@Controller('home')
export class AnuncioFiltroController {
  constructor(private readonly anuncioService: AnuncioService) {}

  @Get('search')
  async getAnuncios(@Req() req: Request, @Res() res: Response) {
    const { destino, checkin, checkout, hospedes } = req.query;

    const checkinDate = !checkin ? undefined : new Date(<string>checkin);
    const checkoutDate = !checkout ? undefined : new Date(<string>checkout);

    if (!destino && !checkinDate && !checkoutDate && !hospedes) {
      return res.status(400).send('Nenhum resultado encontrado.');
    }

    const anuncios = await this.anuncioService.getAnunciosService(
      <string>destino,
      checkinDate,
      checkoutDate,
      parseInt(<string>hospedes),
    );

    if (anuncios.length === 0) {
      return res.status(400).send('Nenhum resultado encontrado.');
    }

    return res.status(200).send(anuncios);
  }
}
