import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { createHostDto } from '../database/dto/create-user-host.dto';
import { CreateUserDto } from '../database/dto/create-user.dto';

const prisma = new PrismaClient();
@Injectable()
export class UserRepository{
    async getUserById(id: string): Promise<CreateUserDto | null>{
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
    
    async getUserHost(id: string): Promise<createHostDto | null>{
        const getHostData = prisma.user.findUnique({
            where:{
                id
            },
            select:{
                firstName: true,
                lastName: true,
                picture: true,
            }
        })
        return getHostData
    }    
}
