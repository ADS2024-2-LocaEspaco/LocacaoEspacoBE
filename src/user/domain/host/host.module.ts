import { Module } from '@nestjs/common';
import { HostController } from './host_Application/controllers/host.controller';
import { HostService } from './host.service';
import { HostRepository } from './host_Repositories/host.repository';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports:[SharedModule],
    controllers:[HostController],
    providers: [HostService, HostRepository]
})
export class HostModule {}