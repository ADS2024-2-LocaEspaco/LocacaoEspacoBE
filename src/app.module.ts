import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user//infrastructure/user.module';
import { HostModule } from './host/host.module';
import { ReservaService } from './host/reserva/reserva.service';
import { HostReservas } from './host/host_Application/controllers/host.controller';
//import { AnuncioModule } from './anuncio/infrastructure/anuncio.module';

@Module({
  imports: [UserModule, HostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
