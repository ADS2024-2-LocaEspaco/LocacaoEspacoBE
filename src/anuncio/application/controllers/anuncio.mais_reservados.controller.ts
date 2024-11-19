import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AnuncioService } from 'src/anuncio/infrastructure/anuncio.service';

@Controller('home')
export class AnuncioMaisReservadosController {
  constructor(private readonly anuncioService: AnuncioService) {}

  @Get('mais-reservados')
  async getAnunciosMaisReservados(@Req() req: Request, @Res() res: Response) {
    return res.send('aaaa');
  }
}
