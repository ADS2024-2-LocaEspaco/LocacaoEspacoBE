// src/user/domain/repositories

import { UserEntity } from "../entities/user.entity.js"

export interface UserRepository {
    //Find user by attribute
    findUserbyId(id: string): Promise<UserEntity>;
    findUserbyEmail(email: string): Promise<UserEntity>;

    //CRUD
    createUser(id: string, email: string, username: string, photo: string): Promise<UserEntity>;
    deleteUser(email: string): Promise<UserEntity>;
    updateUser(user: UserEntity): Promise<UserEntity>;

    // average classification
    avgClassification(id: string): Number;
}