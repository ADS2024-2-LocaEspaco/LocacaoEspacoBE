import { Module } from '@nestjs/common';
import { AnuncioService } from './anuncio.service';
import { AnuncioController } from './anuncio.controller';

@Module({
  imports: [],
  controllers: [AnuncioController],
  providers: [AnuncioService],
})
export class AnuncioModule {}
