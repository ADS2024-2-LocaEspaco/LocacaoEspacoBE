import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  googleLogin(req: any) {
    if (!req.user) {
      return 'Nenhum usuário';
    }

    return {
      message: 'Usuário logado',
      user: req.user,
    };
  }
}
