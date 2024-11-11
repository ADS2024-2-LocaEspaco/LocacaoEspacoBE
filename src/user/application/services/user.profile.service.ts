import { Injectable } from "@nestjs/common";
import { error, log } from "console";
import { userAccountInformation } from "src/user/infrastructure/database/dto/user.profile.account.information";
import { userBankInformation } from "src/user/infrastructure/database/dto/user.profile.bank.information";
import { userBasicInformation } from "src/user/infrastructure/database/dto/user.profile.basic.information";
import { userContactInformation } from "src/user/infrastructure/database/dto/user.profile.contact.information";
import { userImg } from "src/user/infrastructure/database/dto/user.profile.img";
import { userProfile } from "src/user/infrastructure/database/dto/user.profile.information";
import { UserRepository } from "src/user/infrastructure/repositories/user.repositories";

@Injectable()
export class UserProfileService {
    constructor(private readonly userRepository: UserRepository) { }

    async getUserByEmail(req: any): Promise<userProfile> {
        if (!req.email) {
            throw error("Email não identificada")
        }

        const resService = await this.userRepository.getUserByEmail(req.email)

        if (!resService) {
            throw error("Nenhuma informação retornada")
        }

        return resService
    }

    async getUserById(req: any): Promise<userProfile> {
        if (!req) {
            throw error("Nenhuma informação identificada")
        }

        const resGrades = await this.userRepository.avgAvaliation(req.id)

        const resService = await this.userRepository.getUserById(req.id, resGrades)

        if (!resService) {
            throw error("Nenhuma informação retornada")
        }

        return resService
    }

    async avgAvaliation(req: any): Promise<any> {
        if (!req.id_user) {
            throw error("Usuario não identificado")
        }

        const resService = await this.userRepository.avgAvaliation(req.id_user)

        if (!resService) {
            return {
                message: "Erro ao carregar as avaliações",
                success: false
            }
        }

        const averageGrades: number[] = resService.map((grades: number[]) => {
            return this.avgGrades(grades);
        });

        return this.avgGrades(averageGrades)
    }

    async avgGrades(grades: number[]): Promise<number> {
        if (!grades.length) {
            return 0;
        }
    
        const sum = grades.reduce((total, grade) => total + grade, 0);
        return sum / grades.length;
    }

    async updateUserProfile(req: any): Promise<{ message: string, success: boolean }> {
        if (!req.username) {
            throw error("username não identificado")
        }

        const user: userBasicInformation = {
            firstName: req.firstName,
            userAvaliation: req.userAvaliation
        }

        const resService = await this.userRepository.updateUserProfile(user, req.id);

        if (!resService) {
            return {
                message: "Erro ao atualizar o usuário",
                success: false
            }
        }

        return {
            message: "Sucesso ao atualizar o usuário",
            success: true
        }
    }

    async updateBankInformation(req: any): Promise<{ message: string, success: boolean }> {
        if (!req) {
            throw error("Nenhuma informação.")
        }

        const user: userBankInformation = {
            account: req.account,
            agency: req.agency,
            bankCode: req.bankCode,
            bankName: req.bankName
        }

        const resService = await this.userRepository.updateBankInformation(req.id, user);

        if (!resService) {
            return {
                message: "Erro ao atualizar as informações do banco",
                success: false
            }
        }

        return {
            message: "Sucesso ao atualizar as informações do banco",
            success: true
        }
    }

    async updateProfileImage(req: any): Promise<{ message: string, success: boolean }> {
        if (!req) {
            throw error("Nenhuma informação.")
        }

        const user: userImg = {
            img: req.img
        }

        const resService = await this.userRepository.updateProfileImage(req.id, user);

        if (!resService) {
            return {
                message: "Erro ao atualizar a foto de usuário",
                success: false
            }
        }

        return {
            message: "Sucesso ao enviar a foto de usuário",
            success: true
        }
    }

    async updateAccountInformation(req: any): Promise<{message: string, success: boolean}> {
        if (!req) {
            throw error("Nenhuma informação.");
        }

        const user: userAccountInformation = {
            cpf: req.cpf,
            email: req.email,
            lastName: req.lastName
        }


        const resService = await this.userRepository.updateAccountInformation(req.id, user)

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

        const user: userContactInformation = {
            address: req.address,
            cep: req.cep,
            city: req.city,
            phone: req.phone,
            state: req.state
        }


        const resService = await this.userRepository.updateContactInformation(req.id, req.id_user, user);

        if (!resService) {
            return {message: "Erro ao atualizar as informações de contato",
                success: false
            };
        }

        return {message: "Sucesso ao atualizar as informações de contato",
            success: false
        };
    }

    async disableUser(req: any): Promise<string> {
        if (!req) {
            throw error("Nenhuma informação.");
        }

        const resService = await this.userRepository.disableUser(req.id);

        if (!resService) {
            throw error("Nenhuma conta encontrada");
        }

        return resService
    }
}