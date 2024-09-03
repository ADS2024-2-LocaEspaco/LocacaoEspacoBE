import { Controller, Get, Param, Body } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { Anuncio, User } from '@prisma/client';

@Controller('anuncio')
export class AnuncioController {
  constructor(private readonly anuncioService: AnuncioService) {}

  @Get(':id')
  async getAnuncioById(@Param('id') id: string): Promise<Anuncio | null> {
    return this.anuncioService.getAnuncioById(id);
  }

  @Get(':id/:user')
  async getUserFromAnuncio(@Param('id') id: string): Promise<User | null> {
    return this.anuncioService.getUserFromAnuncio(id);
  }
}
