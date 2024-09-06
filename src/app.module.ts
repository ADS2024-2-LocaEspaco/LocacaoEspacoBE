import { Module } from '@nestjs/common';
import { UserModule } from './user/infrastructure/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [UserModule],
})
export class AppModule {}
