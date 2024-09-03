import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HostRepository } from './repositories/host.repositorires';
import { ValidateUuid } from 'src/shared/validators/uuid.validator';

@Injectable()
export class HostService {
    constructor(
        private readonly locations: HostRepository,
        private readonly validate: ValidateUuid){}

    private prisma = new PrismaClient()

    async findAllocations(id: string){

        const valid = this.validate.isUuid(id)

        console.log(valid)

        return this.locations.get_all_locations(id)
    }
      

}

// import { validate as isUUID } from 'uuid';

// async getHostAllocations(@Query('id') id: string) {
//     if (!isUUID(id)) {
//         throw new BadRequestException('ID inválido');
//     }