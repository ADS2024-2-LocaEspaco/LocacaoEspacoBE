import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TesteModule } from './teste/teste.module';

@Module({
  imports: [UserModule, TesteModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
