import { UserEntity } from "../entities/user.entity";

export interface UserSaveRepository {
    userExists(email: string): Promise<boolean>;
    save(user: UserEntity): Promise<UserEntity>;
}