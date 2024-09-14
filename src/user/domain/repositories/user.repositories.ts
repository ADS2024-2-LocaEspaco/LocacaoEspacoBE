// src/user/domain/repositories

import { UserEntity } from "../entities/user.entity.js"

export interface UserRepository {
    //Find user by attribute
    getUserByEmail(email: string): string;
    getUserById(id: string): string;

    //CRUD
    updateUsername(username: string, id: string): Promise<any>
    updateBankInformation(id: string, bank: string, agency: number, accountNumber:number, accountType: string): Promise<any>
    updateProfileImage(id: string, photo: string): Promise<any>
    updateAccountInformation(id: string, cpf: string ,fullname: string): Promise<any>
    updateContactInformation(id: string, phone: string, address: string, state: string, city: string, cep: string): Promise<any>
}