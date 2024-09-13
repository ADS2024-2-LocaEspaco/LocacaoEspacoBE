import { Injectable } from '@nestjs/common';
import { HostRepository } from './repositories/host.repositories';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class HostService {
    constructor( private readonly locations: HostRepository ){}

    async findAllocations(id: string){

        const result = await this.locations.get_all_locations(id)

        console.log(!result)

        if(!result || result.length === 0 ){
            throw new NotFoundException('Usuário sem locações cadastradas!')
        }else{
            return result;
        }
    }
      

}
