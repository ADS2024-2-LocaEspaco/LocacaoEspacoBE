// src/user/domain/repositories

import { UserEntity } from "../entities/user.entity.js"

export interface UserRepository {
    //Find user by attribute
    getUserByEmail(email: string): any;

    //CRUD
    updateUsername(username: string, id: string): Promise<string>
    updateBankInformation(id: string, bank: string, agency: number, accountNumber:number, accountType: string): Promise<string>
    updateProfileImage(id: string, photo: string): Promise<string>
}