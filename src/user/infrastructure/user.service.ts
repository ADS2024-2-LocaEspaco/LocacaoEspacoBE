import { Injectable } from '@nestjs/common';
import { UserSaveRepository } from './repositories/user.save.repository';
import { UserEntity } from '../domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userSaveRepository: UserSaveRepository) {}
  googleLogin(req: any) {
    if (!req.user) {
      return 'Nenhum usuário';
    }
    
    const user = new UserEntity(req.user.email, req.user.firstName, req.user.lastName, req.user.picture, req.user.accessToken);
    
    this.userSaveRepository.save(user);

    return {
      message: 'Usuário logado',
      user: user,
    };
  }
}
