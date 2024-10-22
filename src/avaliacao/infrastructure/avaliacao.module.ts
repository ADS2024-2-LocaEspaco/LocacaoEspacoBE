import { Module } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AvaliacaoService],
  exports: [AvaliacaoService],
})
export class AvaliacaoModule {}
