// src/user/domain/repositories

import { UserEntity } from "../entities/user.entity.js"

export interface UserRepository {
    //Find user by attribute
    getUserbyId(id: string): UserEntity | Promise<{success: boolean, message: string}>;
    getUserbyEmail(email: string): Promise<UserEntity>;

    //CRUD
    createUser(email: string, username: string, photo: string): Promise<UserEntity>;
    deleteUser(email: string): Promise<UserEntity>;
    updateUser(user: UserEntity): Promise<UserEntity>;

    // average classification
    getAvgClassification(id: string): Number;
}