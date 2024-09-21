import { PrismaClient, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import { create, getUserByEmail, updateToken } from '../database/models/User.create.model';
import { userAuthProperty } from '../database/dto/user.auth.property.dto';

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
  async save(user: userAuthProperty): Promise<userAuthProperty | null> {
    const result = await prisma.user.create({
          data: {
            accessToken: user.accessToken,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            picture: user.picture,
          },
          select: {
            id: true,
            email: true,
            lastName: true,
            firstName: true,
            picture: true,
            accessToken: true,
          },
        });

      return result;
    // try {
    //   if (!(await this.userExists(user.email))) {
        
    //     const result = await prisma.user.create({
    //       data: user,
    //       select: {
    //         id: true,
    //         email: true,
    //         firstName: true,
    //         accessToken: true,
    //         picture: true,
    //         lastName: true
    //       },
    //     });

    //     return result;
        
    //   } else {
    //     console.log('Usuário já existe');
    //     await updateToken(user);
    //   }


    // } catch (error) {
    //   return error;
    // }
  }
}
