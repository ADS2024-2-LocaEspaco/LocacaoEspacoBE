import { Injectable } from "@nestjs/common";
import { error, log } from "console";
import { userProfile } from "src/user/infrastructure/database/dto/user.profile.information";
import { UserRepository } from "src/user/infrastructure/repositories/user.repositories";

@Injectable()
export class UserProfileService {
    constructor(private readonly userRepository: UserRepository) {}

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
        
        const resService = await this.userRepository.getUserById(req.id)

        if (!resService) {
            throw error("Nenhuma informação retornada")
        }

        return resService
    }

    // async getUserClassification(req: any): Promise<any> {
    //     if (!req) {
    //         throw error("Nenhuma informação identificada")
    //     }
        
    //     const resService = await this.userRepositoryImp.getUserClassification(req.idUser)

    //     if (!resService) {
    //         throw error("Nenhuma informação retornada")
    //     }

    //     const classifications = resService.map((service: { id: string, classification: number }) => {
    //         if (service.classification < 0 || service.classification > 5) {
    //             throw error("Nota está errada")
    //         }
    //         return service.classification
    //     });

    //     const sum = classifications.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);

    //     if (sum < 0) {
    //         throw error("Erro durante o calculo das classificações")
    //     }

    //     const avg = (sum/classifications.length).toFixed(1);

    //     return avg
    // }

    async updateUserProfile(req: any): Promise<{message: string, success: boolean}>{
        if (!req.username) {
            throw error("username não identificado")
        }

        const user: userProfile = {
            firstName: req.nome,
            lastName: req.nome_completo,
            picture: req.img,
            email: req.email,
            cpf: req.cpf,
            phone: req.fone,
            agency: req.ag,
            account: req.cc,
            bankName: req.nome_instituicao,
            bankCode: req.codigo_instituicao,
            state: req.estado,
            city: req.cidade,
            address: req.bairro,
            cep: req.cep
        }

        const resService = await this.userRepository.updateUserProfile(user, req.id);

        if (!resService) {
            return {message: "Erro ao atualizar o usuário",
                success: false
            }
        }

        return {message: "Sucesso ao atualizar o usuário",
            success: true
        }
    }

    async updateBankInformation(req: any): Promise<{message: string, success: boolean}>{
        if (!req) {
            throw error("Nenhuma informação.")
        }

        const user: userProfile = {
            firstName: req.nome,
            lastName: req.nome_completo,
            picture: req.img,
            email: req.email,
            cpf: req.cpf,
            phone: req.fone,
            agency: req.ag,
            account: req.cc,
            bankName: req.nome_instituicao,
            bankCode: req.codigo_instituicao,
            state: req.estado,
            city: req.cidade,
            address: req.bairro,
            cep: req.cep
        }

        const resService = await this.userRepository.updateBankInformation(req.id, user);

        if (!resService) {
            return {message: "Erro ao atualizar as informações do banco",
                success: false
            }
        }

        return {message: "Sucesso ao atualizar as informações do banco",
            success: true
        }
    }

    // async updateProfileImage(req: any): Promise<{message: string, success: boolean}> {
    //     if (!req) {
    //         throw error("Nenhuma informação.")
    //     }

    //     const resService = await this.userRepositoryImp.updateProfileImage(req.id, req.photo);

    //     if (!resService) {
    //         return {message: "Erro ao atualizar a foto de usuário",
    //             success: false
    //         }
    //     }

    //     return {message: "Sucesso ao enviar a foto de usuário",
    //         success: true
    //     }
    // }

    // async updateAccountInformation(req: any): Promise<{message: string, success: boolean}> {
    //     if (!req) {
    //         throw error("Nenhuma informação.");
    //     }

    //     const resService = await this.userRepositoryImp.updateAccountInformation(req.id, req.cpf, req.fullname)

    //     if (!resService) {
    //         return {message: "Erro ao atualizar os dados da conta",
    //             success: false
    //         };
    //     }

    //     return {message: "Sucesso ao atualizar os dados da conta",
    //         success: true
    //     };
    // }

    // async updateContactInformation(req: any): Promise<{message: string, success: boolean}> {
    //     if (!req) {
    //         throw error("Nenhuma informação.");
    //     }

    //     const resService = await this.userRepositoryImp.updateContactInformation(req.id, req.phone, req.address, req.state, req.city, req.cep);

    //     if (!resService) {
    //         return {message: "Erro ao atualizar as informações de contato",
    //             success: false
    //         };
    //     }

    //     return {message: "Sucesso ao atualizar as informações de contato",
    //         success: false
    //     };
    // }

    // async deleteUser(req: any): Promise<string> {
    //     if (!req) {
    //         throw error("Nenhuma informação.");
    //     }

    //     const resService = await this.userRepositoryImp.deleteUser(req.id);

    //     if (!resService) {
    //         throw error("Nenhuma conta encontrada");
    //     }

    //     return resService
    // }
}