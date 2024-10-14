import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { userAuth } from '../database/dto/user.auth.dto';

const prisma = new PrismaClient();
@Injectable()
export class UserSaveRepository implements UserSaveRepository {
  async userExists(email: string): Promise<boolean> {
    const user = await prisma.usuario.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        nome: true,
        nome_completo: true,
        email: true,
      },
    });

    if (user) {
      return true;
    }

    return false;
  }
  async save(user: userAuth): Promise<any> {
    const result = await prisma.usuario.create({
      data: {
        token_acesso: user.accessToken,
        email: user.email,
        nome: user.nome,
        nome_completo: user.nome_completo,
        img: user.img,
      },
      select: {
        id: true,
        email: true,
        nome: true,
        nome_completo: true,
        img: true,
        token_acesso: true,
      },
    });

    return result;
  }

  async updateToken(user: userAuth): Promise<any> {
    const result = await prisma.usuario.update({
      where: {
        email: user.email,
      },
      data: user,
      select: {
        id: true,
        email: true,
        nome: true,
        nome_completo: true,
        img: true,
        token_acesso: true,
      },
    });

    return result;
  }
}
