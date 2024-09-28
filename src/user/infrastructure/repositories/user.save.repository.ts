import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { userAuth } from '../database/dto/user.auth.dto';

const prisma = new PrismaClient();
@Injectable()
export class UserSaveRepository implements UserSaveRepository{
  async userExists(email: string): Promise<boolean> {
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

    if (user) {
      return true;
    }

    return false;
  }
  async save(user: userAuth): Promise<userAuth> {
    const result = await prisma.usuario.create({
          data: {
            nome: user.name,
            nome_completo: user.fullName,
            email: user.email,
            token_acesso: user.accessToken
          },
          select: {
            id: true,
            email: true,
            nome_completo: true,
            nome: true,
            img: true,
            token_acesso: true,
          },
        });

      return result;
  }

  async updateToken(user: userAuth): Promise<userAuth> {
    const result = await prisma.user.update({
      where: {
        email: user.email
      },
      data: user,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        picture: true,
        accessToken: true,
      }
    });

    return result;
  };
}
