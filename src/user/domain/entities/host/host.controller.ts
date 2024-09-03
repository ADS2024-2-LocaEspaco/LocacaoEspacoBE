import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { HostService } from './host.service';

@Controller('host')
export class HostController {

    constructor(private readonly host: HostService){}

    @Get()
    async getHostAllocations (@Query('id') id: string ){

       const result = await this.host.findAllocations(id)
        

        if(!result){
            throw new NotFoundException('Usuário sem locações cadastradas!')
        }else{
            return result;
        }
    }
}
