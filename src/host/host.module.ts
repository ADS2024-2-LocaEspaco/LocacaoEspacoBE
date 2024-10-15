import { Module } from '@nestjs/common';
import { HostController, HostReservas } from './host_Application/controllers/host.controller'; 
import { AnuncioService } from './anuncio/host.anuncio.service';
import { HostRepository, HostReservasRepo} from './host_Repositories/host.repository';
import { SharedModule } from 'src/shared/shared.module';
import { ReservaService } from './reserva/reserva.service';

@Module({
  imports: [SharedModule],
  controllers: [HostController, HostReservas],
  providers: [AnuncioService, HostRepository, HostReservasRepo, ReservaService],
})
export class HostModule {}
