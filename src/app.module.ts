import { Module } from '@nestjs/common';
import { UserModule } from './user/infrastructure/user.module';
import { HostModule } from './host/host.module';


@Module({
  imports: [UserModule, HostModule],
  providers: [],
})
export class AppModule {}
