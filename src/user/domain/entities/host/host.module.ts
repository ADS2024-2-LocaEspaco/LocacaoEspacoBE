import { Module } from '@nestjs/common';
import { HostController } from './host.controller';
import { HostService } from './host.service';

@Module({
    controllers:[HostController],
    providers: [HostService]
})
export class HostModule {}
