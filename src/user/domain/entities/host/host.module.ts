import { Module } from '@nestjs/common';
import { HostController } from './host.controller';
import { HostService } from './host.service';
import { HostRepository } from './repositories/host.repositorires';

@Module({
    controllers:[HostController],
    providers: [HostService, HostRepository]
})
export class HostModule {}
