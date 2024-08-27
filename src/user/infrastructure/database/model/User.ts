import { PrismaClient, User } from "@prisma/client";
import { CreateUserDto } from "../../dto/create-user.dto";

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

    

