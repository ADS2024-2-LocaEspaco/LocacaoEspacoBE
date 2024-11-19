import { Module } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { AnuncioController } from './anuncio.controller';
import { AnuncioFiltroController } from '../application/controllers/anuncio.filtro.controller';
import { AnuncioFiltroRepository } from './repositories/anuncio.filtro.repository';
import { AnuncioMaisReservadosController } from '../application/controllers/anuncio.mais_reservados.controller';

@Module({
  imports: [],
  controllers: [
    AnuncioController,
    AnuncioFiltroController,
    AnuncioMaisReservadosController,
  ],
  providers: [AnuncioService, AnuncioFiltroRepository],
})
export class AnuncioModule {}
