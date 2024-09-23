import { userAuthProperty } from "src/user/infrastructure/database/dto/user.auth.property.dto";

export interface UserSaveRepository {
    userExists(email: string): Promise<boolean>;
    save(user: userAuthProperty): Promise<userAuthProperty>;
    updateToken(user: userAuthProperty): Promise<userAuthProperty>;
}