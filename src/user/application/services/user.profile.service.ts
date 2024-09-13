import { Injectable } from "@nestjs/common";
import { error, log } from "console";
import { UserRepositoryImp } from "../../infrastructure/repositories/user.repository-impl.js"

@Injectable()
export class UserProfileService {
    constructor(private readonly userRepositoryImp: UserRepositoryImp) {}

    getUserByEmail(req: any): string {
        if (!req.email) {
            throw error("Email não identificado")
        }

        return this.userRepositoryImp.getUserByEmail(req.email)
    }

    getUserById(req: any): string {
        if (!req) {
            throw error("Nenhuma informação identificado")
        }

        return this.userRepositoryImp.getUserById(req.id)
    }

    async updateUsername(req: any): Promise<{message: string, success: boolean}>{
        if (!req.username) {
            throw error("username não identificado")
        }

        const resService = await this.userRepositoryImp.updateUsername(req.username, req.id);

        if (!resService) {
            return {message: "Erro ao atualizar o username",
                success: false
            }
        }

        return {message: "Sucesso ao atualizar o username",
            success: true
        }
    }

    async updateBankInformation(req: any): Promise<{message: string, success: boolean}>{
        if (!req) {
            throw error("Nenhuma informação.")
        }

        const resService = await this.userRepositoryImp.updateBankInformation(req.id, req.bank, req.agency, req.accountNumber, req.accountType);

        if (!resService) {
            return {message: "Erro ao atualizar as informações do banco",
                success: false
            }
        }

        return {message: "Sucesso ao atualizar as informações do banco",
            success: true
        }
    }

    async updateProfileImage(req: any): Promise<{message: string, success: boolean}> {
        if (!req) {
            throw error("Nenhuma informação.")
        }

        const resService = await this.userRepositoryImp.updateProfileImage(req.id, req.photo);

        if (!resService) {
            return {message: "Erro ao atualizar a foto de usuário",
                success: false
            }
        }

        return {message: "Sucesso ao enviar a foto de usuário",
            success: true
        }
    }

    async updateAccountInformation(req: any): Promise<{message: string, success: boolean}> {
        if (!req) {
            throw error("Nenhuma informação.")
        }

        const resService = await this.userRepositoryImp.updateAccountInformation(req.id, req.cpf, req.fullname)

        if (!resService) {
            return {message: "Erro ao atualizar os dados da conta",
                success: false
            }
        }

        return {message: "Sucesso ao atualizar os dados da conta",
            success: true
        }
    }
}