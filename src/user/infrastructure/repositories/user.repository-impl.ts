import { Injectable } from '@nestjs/common';
import { UserRepository } from "../../domain/repositories/user.repositories.js";
import { UserEntity } from "../../domain/entities/user.entity.js";
import { getUserByEmail, getUserById, getUserClassification, updateUsername, updateProfileImage, updateAccountInformation, updateContactInformation, deleteUser } from "../database/models/User.js";

@Injectable()
export class UserRepositoryImp implements UserRepository {
    async getUserByEmail(email: string): Promise<any> {
        return await getUserByEmail(email);
    }

    async getUserById(id: string): Promise<any> {
        return await getUserById(id);
    }

    async getUserClassification(idUser: string): Promise<any> {
        return await getUserClassification(idUser);
    }

    async updateUsername(username: string, id: string): Promise<any> {
        return await updateUsername(id, username)
    }

    async updateBankInformation(id: string, bank: string, agency: number, accountNumber: number, accountType: string): Promise<any> {
        return await updateUsername(id, bank) // Ajeitar quando tiver o banco de dados
    } 
  
    async updateProfileImage(id: string, photo: string): Promise<any> {
        return await updateProfileImage(id, photo)
    }

    async updateAccountInformation(id: string, cpf: string, fullname: string): Promise<any> {
        return await updateAccountInformation(id, cpf, fullname);
    }

    async updateContactInformation(id: string, phone: string, address: string, state: string, city: string, cep: string): Promise<any> {
        return await updateContactInformation(id, phone, address, state, city, cep);
    }

    async deleteUser(id: string): Promise<string> {
        return await deleteUser(id)
    }
}