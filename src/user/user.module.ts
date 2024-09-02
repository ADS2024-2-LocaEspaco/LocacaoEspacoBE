import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { HostModule } from './domain/entities/host/host.module';

@Module({
  imports:[HostModule],
  providers: [UserService]
})
export class UserModule {}
