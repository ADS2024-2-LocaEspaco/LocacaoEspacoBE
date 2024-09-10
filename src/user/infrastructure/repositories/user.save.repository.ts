import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import { create, getUserByEmail, updateToken } from '../database/models/User.create.model';

@Injectable()
export class UserSaveRepository {
  async userExists(email: string): Promise<boolean> {
    if (await getUserByEmail(email)) {
      return true;
    }

    return false;
  }
  async save(user: UserEntity): Promise<UserEntity> {
    try {
      if (!(await this.userExists(user.getEmail))) {
        await create(user);
      } else {
        console.log('Usuário já existe');
        await updateToken(user);
      }

      return user;
    } catch (error) {
      return error;
    }
  }
}
