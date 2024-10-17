import { Module } from '@nestjs/common';
import { HostController, HostReservas } from './host_Application/controllers/host.controller'; 
import { AnuncioService } from './anuncio/host.anuncio.service';
import { AnuncioRepository } from './database/dto/host.anuncio.dto';
import { HostReservasRepo } from 'src/host/database/dto/host.reserva.dto';
import { SharedModule } from 'src/shared/shared.module';
import { ReservaService } from './reserva/reserva.service';
// import { AnuncioValidator, ReservaValidator } from './database/validator/host.validator.dto';

@Module({
  imports: [SharedModule],
  controllers: [HostController, HostReservas],
  providers: [AnuncioService, AnuncioRepository, HostReservasRepo, ReservaService],
})
export class HostModule {}
