import { Controller, Get, Query } from '@nestjs/common';
import { HostService } from '../../host.service';
import { userUuidValidator } from '../../../../../shared/validators/uuid.validator';

@Controller('host')
export class HostController {

    constructor(
        private readonly host: HostService){}

    @Get()
    async getHostAllocations (@Query() query: userUuidValidator){
      
      const result = await this.host.findAllocations(query.userId);

      return result;
      
    }
}