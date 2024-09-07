import { Module } from '@nestjs/common';
import { UserModule } from './user/infrastructure/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
