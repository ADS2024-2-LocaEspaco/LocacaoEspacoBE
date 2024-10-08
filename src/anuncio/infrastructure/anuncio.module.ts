import { Module } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { AnuncioController } from './anuncio.controller';
import { AnuncioFiltroController } from '../application/controllers/anuncio.filtro.controller';

@Module({
  imports: [],
  controllers: [AnuncioController, AnuncioFiltroController],
  providers: [AnuncioService],
})
export class AnuncioModule {}
