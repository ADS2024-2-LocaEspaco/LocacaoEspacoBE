import { Module } from '@nestjs/common';
import { HostController, HostReservas } from './host_Application/controllers/host.controller'; 
import { HostReservaDados, HostService } from './host.service';
import { HostRepository, HostReservasRepo} from './host_Repositories/host.repository';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [HostController, HostReservas],
  providers: [HostService, HostReservaDados, HostRepository, HostReservasRepo],
})
export class HostModule {}
