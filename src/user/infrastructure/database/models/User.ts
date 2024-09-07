import { PrismaClient } from "@prisma/client";
import { UserEntity } from "src/user/domain/entities/user.entity";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const getUsers = async() => {
    const users = await prisma.user.findMany();

    return users;
}

export const getUserbyId = async(id: string) => {
    const client = await prisma.user.findUnique({
        where: {
            id
        }
    });

    return client
}

export const getUserbyEmail = async(email: string) => {
    const client = await prisma.user.findUnique({
        where: {
            email
        }
    });

    return client
}

export const createUser = async (username: string, email: string, photo: string) => {
    const user = await prisma.user.create({
        data: {
            id: uuidv4(),
            username,
            email,
            photo
        }
    });

    return user;
}

export const deleteUser = async(email: string) => {
    const user = await prisma.user.delete({
        where: {
            email
        }
    });

    return user;
}

export const updateUser = async(client: UserEntity) => {
    const user = await prisma.user.update({
        where: {
            email: client.getEmail
        },
        data: {

        }
    })

    return user;
}

export const getClassifications = async(email: string) => {
    //const user = await prisma.user.find({
    //    where: {
    //        email
    //    }, select: {
    //        classification: true
    //    }
    //})

    //return user
}