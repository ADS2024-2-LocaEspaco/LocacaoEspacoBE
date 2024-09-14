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

export const getUserById = async(id: string) => {
    const client = await prisma.user.findUnique({
        where: {
            id
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

    return client
}

export const updateAccountInformation = async(id: string, cpf: string, fullname: string) => {
    const client = await prisma.user.update({
        where: {
            id
        },
        data: {
            cpf,
            fullname
        },
        select: {
            cpf: true,
            fullname: true
        }
    })

    return client
}

export const updateContactInformation = async(id: string, phone: string, address: string, state: string, city: string, cep: string) => {
    const client = await prisma.user.update({
        where: {
            id
        },
        data: {
            phone,
            address,
            state,
            city,
            cep
        },
        select: {
            phone: true,
            address: true,
            state: true,
            city: true,
            cep: true
        }
    })

    return client
}