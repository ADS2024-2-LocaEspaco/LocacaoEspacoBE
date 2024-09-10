import { PrismaClient } from "@prisma/client";
import { UserEntity } from "src/user/domain/entities/user.entity";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const getUserByEmail = async(email: string) => {
    const client = await prisma.user.findUnique({
        where: {
            email
        }
    });

    return client
}

export const updateUsername = async(id: string ,username: string) => {
    const client = await prisma.user.update({
        where: {
            id
        },
        data: {
            username
        }
    })

    return ("Username atualizado " + client.username)
}
/*
export const updateBankInformation = async(id: string, bank: string, agency: number, accountNumber: number, accountType: string) => {
    const client = await prisma.user.update({
        where: {
            id
        },
        data: {
            bank, 
            agency, 
            accountNumber, 
            accountType
        }
    })

    return client
}*/

export const updateProfileImage = async(id: string, photo: string) => {
    const client = await prisma.user.update({
        where: {
            id
        },
        data: {
            photo
        }
    })

    return ("Foto atualizada " + client.photo)
}
