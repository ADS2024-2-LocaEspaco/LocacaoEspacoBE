import { PrismaClient } from '@prisma/client';
import { UserEntity } from 'src/user/domain/entities/user.entity';

const prisma = new PrismaClient();

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  });

  return user;
};

export const create = async (user: any) => {
  const result = await prisma.user.create({
    data: user,
    select: {
      id: true,
      firstName: true,
    },
  });

  return result;
};

export const updateToken = async (user: any) => {
  const result = await prisma.user.update({
    where: {
      email: user.email
    },
    data: user,
    select: {
      id: true,
      firstName: true
    }
  });

  return result;
};
