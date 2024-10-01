import { Module } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { AnuncioController } from './anuncio.controller';
import { AvaliacaoService } from 'src/avaliacao/infrastructure/avaliacao.service';

@Module({
  imports: [],
  controllers: [AnuncioController],
  providers: [AnuncioService, AvaliacaoService],
})
export class AnuncioModule {}
