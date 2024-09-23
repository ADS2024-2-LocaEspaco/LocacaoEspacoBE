import { Injectable } from '@nestjs/common';
import { UserSaveRepository } from './repositories/user.save.repository';
import { userAuthProperty } from './database/dto/user.auth.property.dto';
import { User } from '@prisma/client';
import { userAuth } from './database/dto/user.auth.dto';

@Injectable()
export class UserService {
  constructor(private readonly userSaveRepository: UserSaveRepository) {}
  async googleLogin(req: any) {
    if (!req.user) {
      return 'Nenhum usuário';
    }
    
    const user: userAuth = {
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
  }
}
