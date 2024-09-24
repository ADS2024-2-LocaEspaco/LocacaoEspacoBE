import { PrismaClient, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { userAuthProperty } from '../database/dto/user.auth.property.dto';
import { createHostDto } from '../dto/create-user-host.dto';
import { CreateUserDto } from '../dto/create-user.dto';

const prisma = new PrismaClient();
@Injectable()
export class UserRepository{
    async getUserById(id: string): Promise<CreateUserDto | null>{
        const comentario = prisma.user.findUnique({
            where:{
                id: id
            },
            select:{
                id: true,
                firstName: true,
                lastName: true,
                picture: true,
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
