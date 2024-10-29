import { Module } from '@nestjs/common';
import { HostReservas } from './host_Application/controllers/host.controller'; //HostController, 
//import { AnuncioService } from './anuncio/host.anuncio.service';
//import { AnuncioRepository } from './database/dto/host.anuncio.dto';
import { HostReservasRepo } from 'src/host/database/dto/host.reserva.dto';
import { ReservaService } from './reserva/reserva.service';
// import { AnuncioValidator, ReservaValidator } from './database/validator/host.validator.dto';

@Module({
  imports: [],
  controllers: [ HostReservas ], //HostController,
  providers: [ HostReservasRepo, ReservaService], //AnuncioService, AnuncioRepository,
})
export class HostModule {}


//MUDANÇAS FEITAS::: 

// ANUNCIO = OFF
// MUDANÇA EM ALGUNS PONTOS DE "AVALIAÇÃO"
//apaguei a pasta anuncio
//removi a referencia de anuncio, no modulo principal