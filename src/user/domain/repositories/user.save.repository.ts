import { userAuth } from 'src/user/infrastructure/database/dto/user.auth.dto';

export interface UserSaveRepository {
  userExists(email: string): Promise<boolean>;
  save(user: userAuth): Promise<userAuth>;
  updateToken(user: userAuth): Promise<userAuth>;
}
