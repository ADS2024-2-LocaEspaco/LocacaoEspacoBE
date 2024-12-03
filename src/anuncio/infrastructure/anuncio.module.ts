import { Module } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { AnuncioController } from './anuncio.controller';
import { AnuncioFiltroController } from '../application/controllers/anuncio.filtro.controller';
import { AnuncioFiltroRepository } from './repositories/anuncio.filtro.repository';
import { AnuncioMaisReservadosController } from '../application/controllers/anuncio.mais_reservados.controller';
import { AnuncioMaisReservadosRepository } from './repositories/anuncio.mais_reservados.repository';
import { AnunciosRecomendadosController } from '../application/controllers/anuncio.recomendados.controller';
import { AnunciosRecomendadosRepository } from './repositories/anuncio.recomendados.repository';
@Module({
  imports: [],
  controllers: [
    AnuncioController,
    AnuncioFiltroController,
    AnuncioMaisReservadosController,
    AnunciosRecomendadosController,
  ],
  providers: [
    AnuncioService,
    AnuncioFiltroRepository,
    AnuncioMaisReservadosRepository,
    AnunciosRecomendadosRepository,
  ],
})
export class AnuncioModule {}
