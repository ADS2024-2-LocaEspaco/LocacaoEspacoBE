import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { userAuth } from '../database/dto/user.auth.dto';

const prisma = new PrismaClient();
@Injectable()
export class UserSaveRepository implements UserSaveRepository {
  async userExists(email: string): Promise<boolean> {
    const user = await prisma.usuario.findUnique({
      where: { email },
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
  async save(user: userAuth): Promise<userAuth> {
    const result = await prisma.usuario.create({
      data: {
        nome: user.name,
        nome_completo: user.fullName,
        email: user.email,
        token_acesso: user.accessToken,
        foto: user.picture,
      },
      select: {
        token_acesso: true,
        email: true,
        nome: true,
        nome_completo: true,
        foto: true,
      },
    });

    const userSaved: userAuth = {
      accessToken: result.token_acesso,
      email: result.email,
      name: result.nome,
      fullName: result.nome_completo,
      picture: result.foto,
    };

    return userSaved;
  }

  async updateToken(user: userAuth): Promise<userAuth> {
    const result = await prisma.usuario.update({
      where: {
        email: user.email,
      },
      data: {
        token_acesso: user.accessToken,
      },
      select: {
        id: true,
        email: true,
        nome: true,
        nome_completo: true,
        foto: true,
        token_acesso: true,
      },
    });

    const userSaved: userAuth = {
      accessToken: result.token_acesso,
      email: result.email,
      name: result.nome,
      fullName: result.nome_completo,
      picture: result.foto,
    };

    return userSaved;
  }
}
