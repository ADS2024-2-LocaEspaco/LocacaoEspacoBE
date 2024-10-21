// src/user/domain/repositories
import { usuario } from "@prisma/client";

export interface UserRepository {
    //Find user by attribute
    getUserbyId(id: string): Promise<usuario>;
    getUserbyEmail(email: string): Promise<usuario>;

    //CRUD
    createUser(email: string, username: string, photo: string): Promise<usuario>;
    deleteUser(email: string): Promise<usuario>;
    updateUser(user: usuario): Promise<usuario>;

    // average classification
    getAvgClassification(id: string): Number;
}