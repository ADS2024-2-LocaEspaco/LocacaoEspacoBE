import { PrismaClient } from "@prisma/client";
import { UserEntity } from "src/user/domain/entities/user.entity";

const prisma = new PrismaClient();

export const getUsers = async() => {
    const users = await prisma.user.findMany();

    return users;
}

export const createUser = async (user: UserEntity) => {
    await prisma.user.create({
        data: {
            username: user.getUsername,
            email: user.getEmail,
            photo: user.getPhoto
        }
    });
}