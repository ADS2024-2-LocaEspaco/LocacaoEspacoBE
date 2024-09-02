import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';



@Injectable()
export class HostService {
    private prisma = new PrismaClient()

    findAllocations = async(id: string) => {
       const id1 = id
       const id2 = parseInt(id1)

       if(isNaN(id2)){
        throw new Error("Id não númerico!")
       }
        
        const getLocations = await this.prisma.anuncio.findMany({
        where:{
            userId: id2,
        },
        select:{
            id: true,
            title: true,
            address: true,
            description:true
        }
        })

        console.log("locais retornados!")
        return getLocations
    }
}
