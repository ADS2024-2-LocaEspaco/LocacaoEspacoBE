// src/user/domain/repositories
import { User } from "@prisma/client";

export interface UserRepository {
    //Find user by attribute
    getUserbyId(id: string): Promise<User>;
    getUserbyEmail(email: string): Promise<User>;

    //CRUD
    createUser(email: string, username: string, photo: string): Promise<User>;
    deleteUser(email: string): Promise<User>;
    updateUser(user: User): Promise<User>;

    // average classification
    getAvgClassification(id: string): Number;
}