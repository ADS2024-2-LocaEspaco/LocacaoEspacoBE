import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

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
                foto: true,
            }
        })

        return comentario
    };
    
    async getUserHost(id: number): Promise<object | null>{
        const getHostData = await prisma.usuario.findUnique({
            where:{
                id,
            },
            select:{
                nome: true,
                nome_completo: true,
                foto: true,
                anuncio: true
            }
        })
        return getHostData?.anuncio.length == 0 ? null: getHostData
    }    
}
