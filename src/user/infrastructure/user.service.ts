import { Injectable } from '@nestjs/common';
import { UserSaveRepository } from './repositories/user.save.repository';
import { UserEntity } from '../domain/entities/user.entity';
import { userAuthProperty } from './database/dto/user.auth.property.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userSaveRepository: UserSaveRepository) {}
  googleLogin(req: any) {
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
    
    this.userSaveRepository.save(user);

    return {
      message: 'Usuário logado',
      user: user,
    };
  }
}
