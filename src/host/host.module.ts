import { Module } from '@nestjs/common';
import { HostReservas} from './host_Application/controllers/host.controller'; 
import { PrismaService } from './database/prisma.instace';
import { ReservaService } from './reserva/reserva.service';
import { DadosDeReserva } from './database/dto/get.dados.reserva.dto';
import { AtualizarDadosDeReserva } from './database/dto/att.dados.reserva.dto';
import { Notificacoes } from './database/dto/notificacoes.dto';
import { AlteracoesAnfitriao } from './database/dto/anfitriao.altera.dados';
import { Outros } from './anuncio/host.anuncio.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [ HostReservas], 
  providers: [ ReservaService, PrismaService, DadosDeReserva, AtualizarDadosDeReserva, Notificacoes, AlteracoesAnfitriao, Outros], 
})
export class HostModule {}


//MUDANÇAS FEITAS::: 

// ANUNCIO = OFF
// MUDANÇA EM ALGUNS PONTOS DE "AVALIAÇÃO"
//apaguei a pasta anuncio
//removi a referencia de anuncio, no modulo principal