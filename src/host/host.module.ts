import { Module } from '@nestjs/common';
import { HostReservas} from './host_Application/controllers/host.controller'; 
import { PrismaService } from './database/prisma.instace';
import { ReservaService } from './reserva/reserva.service';
import { DadosDeReserva } from './database/dto/get.dados.reserva.dto';
import { AtualizarDadosDeReserva } from './database/dto/att.dados.reserva.dto';

@Module({
  imports: [],
  controllers: [ HostReservas ], 
  providers: [ ReservaService, PrismaService, DadosDeReserva, AtualizarDadosDeReserva], 
})
export class HostModule {}


//MUDANÇAS FEITAS::: 

// ANUNCIO = OFF
// MUDANÇA EM ALGUNS PONTOS DE "AVALIAÇÃO"
//apaguei a pasta anuncio
//removi a referencia de anuncio, no modulo principal