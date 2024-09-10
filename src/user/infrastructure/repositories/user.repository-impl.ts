import { Injectable } from '@nestjs/common';
import { UserRepository } from "../../domain/repositories/user.repositories.js";
import { UserEntity } from "../../domain/entities/user.entity.js";
import { getUserByEmail, updateUsername, updateProfileImage } from "../database/models/User.js";

@Injectable()
export class UserRepositoryImp implements UserRepository {
    getUserByEmail(email: string): any {
        return getUserByEmail(email);
    }

    async updateUsername(username: string, id: string): Promise<string> {
        return await updateUsername(id, username)
    }

    async updateBankInformation(id: string, bank: string, agency: number, accountNumber: number, accountType: string): Promise<string> {
        return await updateUsername(id, bank)
    }
  
    async updateProfileImage(id: string, photo: string): Promise<string> {
        return await updateProfileImage(id, photo)
    }
}