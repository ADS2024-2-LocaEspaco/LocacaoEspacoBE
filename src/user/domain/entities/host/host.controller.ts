import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { HostService } from './host.service';
import { userUuidValidator } from '../../../../shared/validators/Anuncio.validator'

@Controller('host')
export class HostController {

    constructor(
        private readonly host: HostService){}

    @Get()
    async getHostAllocations (@Query() userUuid: userUuidValidator){
       
     console.log(userUuid.userId)
       const result = await this.host.findAllocations(userUuid.userId)

     return result
    }
}