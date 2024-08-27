// src/user/domain/repositories

import { UserEntity } from "../entities/user.entity.js"

export interface UserRepository {
    //Find user by attribute
    findUserbyId(id: string): Promise<UserEntity>;
    findUserbyEmail(email: string): Promise<UserEntity>;
}