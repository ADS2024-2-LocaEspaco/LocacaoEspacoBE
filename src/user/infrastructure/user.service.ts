import { Injectable } from '@nestjs/common';
import { UserSaveRepository } from './repositories/user.save.repository';
import { UserEntity } from '../domain/entities/user.entity';
import { userAuthProperty } from './database/dto/user.auth.property.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userSaveRepository: UserSaveRepository) {}
  async googleLogin(req: any) {
    if (!req.user) {
      return 'Nenhum usuário';
    }
    
    const user: userAuthProperty = {
      accessToken: req.user.accessToken,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      picture: req.user.picture,
    };
    
    try {
      if (!(await this.userSaveRepository.userExists(user.email))) {
        await this.userSaveRepository.save(user);
      
      }else {
        await this.userSaveRepository.updateToken(user);
      }

      return {
        message: 'Usuário logado',
        user: user,
      };
    }catch(error) {
      return {
        message: error
      }
    }
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
