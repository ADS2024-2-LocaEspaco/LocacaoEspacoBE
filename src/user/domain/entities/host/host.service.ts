import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HostRepository } from './repositories/host.repositorires';

@Injectable()
export class HostService {
    constructor(private readonly locations: HostRepository){}

    private prisma = new PrismaClient()

    async findAllocations(id: string){
        return this.locations.get_all_locations(id)
    }
      

}

// import { validate as isUUID } from 'uuid';

// async getHostAllocations(@Query('id') id: string) {
//     if (!isUUID(id)) {
//         throw new BadRequestException('ID inválido');
//     }