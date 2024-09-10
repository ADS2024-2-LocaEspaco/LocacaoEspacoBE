import { Injectable } from "@nestjs/common";
import { error, log } from "console";
import { UserRepositoryImp } from "../../infrastructure/repositories/user.repository-impl.js"

@Injectable()
export class UserProfileService {
    constructor(private readonly userRepositoryImp: UserRepositoryImp) {}

    getUserByEmail(req: any) {
        if (!req.email) {
            return "Email não identificado"
        }

        return this.userRepositoryImp.getUserByEmail(req.email)
    }

    updateUsername(req: any): Promise<string>{
        if (!req.username) {
            throw error("username não identificado")
        }

        return this.userRepositoryImp.updateUsername(req.username, req.id);
    }

    updateBankInformation(req: any): Promise<string>{
        if (!req) {
            throw error("Nenhuma informação.")
        }

        return this.userRepositoryImp.updateBankInformation(req.id, req.bank, req.agency, req.accountNumber, req.accountType);
    }

    updateProfileImage(req: any): Promise<string> {
        if (!req) {
            throw error("Nenhuma informação.")
        }

        return this.userRepositoryImp.updateProfileImage(req.id, req.photo);
    }
}