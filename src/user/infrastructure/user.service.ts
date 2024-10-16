import { Injectable } from '@nestjs/common';
import { UserSaveRepository } from './repositories/user.save.repository';
import { UserDataRepository } from './repositories/user.getData.repository';
import { userAuth } from './database/dto/user.auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userSaveRepository: UserSaveRepository,
    private readonly userGetDataRepository: UserDataRepository,
  ) {}

  async googleLogin(req: any) {
    let userData: userAuth;

    if (!req.user) {
      const user = null;
      return user;
    }

    const hashToken = await bcrypt.hash(req.user.accessToken, 10);
    const user: userAuth = {
      accessToken: hashToken,
      email: req.user.email,
      name: req.user.firstName,
      fullName: req.user.firstName + ' ' + req.user.lastName,
      picture: req.user.picture,
    };

    try {
      if (!(await this.userSaveRepository.userExists(user.email))) {
        userData = await this.userSaveRepository.save(user);
      } else {
        userData = await this.userSaveRepository.updateToken(user);
      }

      return {
        message: 'Usuário logado',
        user: userData,
      };
    } catch (error) {
      return {
        message: error,
      };
    }
  }

  async getUserData(token: string) {
    try {
      const data = await this.userGetDataRepository.getUser(token);
      return data;
    } catch (error) {
      return error;
    }
  }
}
