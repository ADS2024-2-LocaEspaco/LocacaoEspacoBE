import { Injectable } from "@nestjs/common";
import { AnuncioPartial, hostRepositories } from "./host.repositories.inteface";
import {  PrismaClient } from "@prisma/client";

@Injectable()
export class HostRepository implements hostRepositories{
    
    private prisma = new PrismaClient();

   async get_all_locations(id: string): Promise<AnuncioPartial[]> {
        return await this.prisma.anuncio.findMany({
            where:{

            userId:id

            }, select:{
                id: true,
                title: true,
                address: true,
                description: true,
                userId: true,
                qtdMaxHospedes: true}
            }
        )}
}