// src/user/domain/repositories

import { deleteUser } from "src/user/infrastructure/database/models/User.js";
import { UserEntity } from "../entities/user.entity.js"

export interface UserRepository {
    //CRUD - Get
    getUserByEmail(email: string): Promise<any>;
    getUserById(id: string): Promise<any>;
    getUserClassification(idUser: string): Promise<any>;

    //CRUD - Update
    updateUsername(username: string, id: string): Promise<any>
    updateBankInformation(id: string, bank: string, agency: number, accountNumber:number, accountType: string): Promise<any>
    updateProfileImage(id: string, photo: string): Promise<any>
    updateAccountInformation(id: string, cpf: string ,fullname: string): Promise<any>
    updateContactInformation(id: string, phone: string, address: string, state: string, city: string, cep: string): Promise<any>

    //CRUD - Delete
    deleteUser(id: string): Promise<string> 
}