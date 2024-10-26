import { userAuth } from 'src/user/infrastructure/database/dto/user.auth.dto';

export interface UserSaveRepository {
  getUser(token: string): Promise<userAuth | null>;
}
