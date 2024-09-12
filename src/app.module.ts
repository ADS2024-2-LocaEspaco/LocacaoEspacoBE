import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/infrastructure/user.module';
import { PropertyModule } from './property/infrastructure/property.module';

@Module({
  imports: [UserModule,PropertyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
