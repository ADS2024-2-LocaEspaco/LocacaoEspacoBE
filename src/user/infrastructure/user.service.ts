import { Injectable } from '@nestjs/common';
import { UserSaveRepository } from './repositories/user.save.repository';

@Injectable()
export class UserService {
  constructor(private readonly userSaveRepository: UserSaveRepository) {}
  googleLogin(req: any) {
    if (!req.user) {
      return 'Nenhum usuário';
    }

    console.log(this.userSaveRepository.save(req.user));

    return {
      message: 'Usuário logado',
      user: req.user,
    };
  }
}
