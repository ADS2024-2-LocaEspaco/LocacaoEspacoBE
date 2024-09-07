import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import { create, getUserByEmail } from '../database/models/User.create.model';

@Injectable()
export class UserSaveRepository {
  async userExists(email: string): Promise<boolean> {
    if (await getUserByEmail(email)) {
      return true;
    }

    return false;
  }
  async save(user: any): Promise<UserEntity> {
    console.log(user.email);
    try {
      if (!(await this.userExists(user.email))) {
        console.log(await create(user));
      } else {
        console.log('Usuário já existe');
      }

      return user;
    } catch (error) {
      return error;
    }
  }
}
