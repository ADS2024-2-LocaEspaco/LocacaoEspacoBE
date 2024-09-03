import { Module } from '@nestjs/common';
import { HostController } from './host.controller';
import { HostService } from './host.service';
import { HostRepository } from './repositories/host.repositories';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports:[SharedModule],
    controllers:[HostController],
    providers: [HostService, HostRepository]
})
export class HostModule {}
