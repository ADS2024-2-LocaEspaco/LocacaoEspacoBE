import { Injectable } from '@nestjs/common';
import { userAuth } from '../database/dto/user.auth.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UserDataRepository implements UserDataRepository {
  async getUser(token: string): Promise<userAuth | null> {
    const user = await prisma.usuario.findFirst({
      where: {
        token_acesso: token,
      },

      select: {
        token_acesso: true,
        email: true,
        nome: true,
        nome_completo: true,
        img: true,
      },
    });

    if (user) {
      const userSaved: userAuth = {
        accessToken: user.token_acesso,
        email: user.email,
        name: user.nome,
        fullName: user.nome_completo,
        picture: user.img,
      };

      return userSaved;
    } else {
      return null;
    }
  }
}
