import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { createHostDto } from '../database/dto/create-user-host.dto';
import { CreateUserDto } from '../database/dto/create-user.dto';

const prisma = new PrismaClient();
@Injectable()
export class UserRepository{
    async getUserById(id: number): Promise</*CreateUserDto | null*/any>{
        const comentario = prisma.usuario.findUnique({
            where:{
                id: id
            },
            select:{
                id: true,
                nome: true,
                nome_completo: true,
                img: true,
            }
        })

        return comentario
    };
    
    async getUserHost(id: number): Promise</*createHostDto | null*/any>{
        const getHostData = prisma.usuario.findUnique({
            where:{
                id
            },
            select:{
                nome: true,
                nome_completo: true,
                img: true,
            }
        })
        return getHostData
    }    
}
