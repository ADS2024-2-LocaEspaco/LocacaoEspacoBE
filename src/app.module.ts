import { Module } from '@nestjs/common';
import { UserModule } from './user/infrastructure/user.module';
import { HostModule } from './user/domain/host/host.module';

@Module({
  imports: [UserModule, HostModule],
})
export class AppModule {}
