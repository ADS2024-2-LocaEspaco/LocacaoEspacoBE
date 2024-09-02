import { PrismaClient } from "@prisma/client";
import { UserEntity } from "src/user/domain/entities/user.entity";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const getUsers = async() => {
    const users = await prisma.user.findMany();

    return users;
}

export const getUserbyId = async(user: UserEntity) => {
    const client = await prisma.user.findUnique({
        where: {
            id: user.getId
        }
    });

    return client
}

export const getUserbyEmail = async(user: UserEntity) => {
    const client = await prisma.user.findUnique({
        where: {
            id: user.getEmail
        }
    });

    return client
}

export const createUser = async (user: UserEntity) => {
    await prisma.user.create({
        data: {
            id: uuidv4(),
            username: user.getUsername,
            email: user.getEmail,
            photo: user.getPhoto
        }
    });
}