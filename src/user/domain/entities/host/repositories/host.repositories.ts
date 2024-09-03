import { Injectable } from "@nestjs/common";
import { hostRepositories } from "./host.repositories.inteface";
import { Anuncio, PrismaClient } from "@prisma/client";

@Injectable()
export class HostRepository implements hostRepositories{
    
    private prisma = new PrismaClient();

   async get_all_locations(id: string): Promise<Anuncio[]> {
        return await this.prisma.anuncio.findMany({
            where:{

            userId:id

            }
        })
    }
}