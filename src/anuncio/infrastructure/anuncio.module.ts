import { Module } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { AnuncioController } from './anuncio.controller';
import { AnuncioFiltroController } from '../application/controllers/anuncio.filtro.controller';
import { AnuncioFiltroRepository } from './repositories/anuncio.filtro.repository';

@Module({
  imports: [],
  controllers: [AnuncioController, AnuncioFiltroController],
  providers: [AnuncioService, AnuncioFiltroRepository],
})
export class AnuncioModule {}
