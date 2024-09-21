import { Injectable } from "@nestjs/common";
import { error, log } from "console";
import { UserRepositoryImp } from "../../infrastructure/repositories/user.repository-impl.js"

@Injectable()
export class UserProfileService {
    constructor(private readonly userRepositoryImp: UserRepositoryImp) {}

    async getUserByEmail(req: any): Promise<any> {
        if (!req.email) {
            throw error("Email não identificada")
        }

        const resService = await this.userRepositoryImp.getUserByEmail(req.email)

        if (!resService) {
            throw error("Nenhuma informação retornada")
        }

        return resService
    }

    async getUserById(req: any): Promise<any> {
        if (!req) {
            throw error("Nenhuma informação identificada")
        }
        
        const resService = await this.userRepositoryImp.getUserById(req.id)

        if (!resService) {
            throw error("Nenhuma informação retornada")
        }

        return resService
    }

    async getUserClassification(req: any): Promise<any> {
        if (!req) {
            throw error("Nenhuma informação identificada")
        }
        
        const resService = await this.userRepositoryImp.getUserClassification(req.idUser)

        if (!resService) {
            throw error("Nenhuma informação retornada")
        }

        const classifications = resService.map((service: { id: string, classification: number }) => {
            if (service.classification < 0 || service.classification > 5) {
                throw error("Nota está errada")
            }
            return service.classification
        });

        const sum = classifications.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);

        if (sum < 0) {
            throw error("Erro durante o calculo das classificações")
        }

        const avg = (sum/classifications.length).toFixed(1);

        return avg
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
            throw error("Nenhuma informação.");
        }

        const resService = await this.userRepositoryImp.updateAccountInformation(req.id, req.cpf, req.fullname)

        if (!resService) {
            return {message: "Erro ao atualizar os dados da conta",
                success: false
            };
        }

        return {message: "Sucesso ao atualizar os dados da conta",
            success: true
        };
    }

    async updateContactInformation(req: any): Promise<{message: string, success: boolean}> {
        if (!req) {
            throw error("Nenhuma informação.");
        }

        const resService = await this.userRepositoryImp.updateContactInformation(req.id, req.phone, req.address, req.state, req.city, req.cep);

        if (!resService) {
            return {message: "Erro ao atualizar as informações de contato",
                success: false
            };
        }

        return {message: "Sucesso ao atualizar as informações de contato",
            success: false
        };
    }

    async deleteUser(req: any): Promise<string> {
        if (!req) {
            throw error("Nenhuma informação.");
        }

        const resService = await this.userRepositoryImp.deleteUser(req.id);

        if (!resService) {
            throw error("Nenhuma conta encontrada");
        }

        return resService
    }
}