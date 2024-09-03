import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../../dto/create-user.dto";
import { createHostDto } from "../../dto/create-user-host.dto";


const prisma = new PrismaClient();

export async function getUserById(id: string): Promise<CreateUserDto | null>{
    const comentario = prisma.user.findUnique({
        where:{
            id: id
        },
        select:{
            id: true,
            username: true,
            photo: true,
        }
    })
    return comentario
}

export async function getUserHost(id: string): Promise<createHostDto | null>{
    const getHostData = prisma.user.findUnique({
        where:{
            id
        },
        select:{
            username: true,
            photo: true,
            createdAt: true,
        }
    })
    return getHostData
}    

