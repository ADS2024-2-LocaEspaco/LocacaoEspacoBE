import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user//infrastructure/user.module';
import { AnuncioModule } from './anuncio/infrastructure/anuncio.module';

@Module({
  imports: [UserModule, AnuncioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
