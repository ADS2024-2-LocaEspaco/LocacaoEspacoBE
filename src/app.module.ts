import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [UserModule, SharedModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
