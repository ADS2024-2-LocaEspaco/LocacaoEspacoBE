import { PrismaClient, PrismaPromise } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { userProfile } from '../database/dto/user.profile.information';
import { userImg } from '../database/dto/user.profile.img';
import { userBasicInformation } from '../database/dto/user.profile.basic.information';
import { userAccountInformation } from '../database/dto/user.profile.account.information';
import { userBankInformation } from '../database/dto/user.profile.bank.information';
import { userContactInformation } from '../database/dto/user.profile.contact.information';

const prisma = new PrismaClient();
@Injectable()
export class UserRepository implements UserRepository{
    async getUserById(id: number, avaliation: number): Promise<userProfile | null>{
        const result = await prisma.usuario.findUnique({
            where:{
                id: id
            },
            include: {
                endereco: true,
                dados_bancarios: true
            },
        })

        if (!result) {
            return null;
        }
    
        const img: userImg = {
            img: result.foto
        }

        const basicInformation: userBasicInformation = {
            firstName: result.nome,
            userAvaliation: avaliation
        }

        const accountInformation: userAccountInformation = {
            lastName: result.nome_completo,
            email: result.email,
            cpf: result.cpf
        }

        const contact: userContactInformation = {
            phone: result.telefone,
            state: result.endereco[0].estado,
            city: result.endereco[0].cidade,
            address: result.endereco[0].rua,
            cep: result.endereco[0].cep
        }

        const bank: userBankInformation = {
            bankName: result.dados_bancarios[0].banco,
            agency: result.dados_bancarios[0].agencia,
            bankCode: result.dados_bancarios[0].numero_conta,
            account: result.dados_bancarios[0].tipo_conta
        }

        const user: userProfile = {
            userImg: img,
            userBasicInformation: basicInformation,
            userAccountInformation: accountInformation,
            userContactInformation: contact,
            userBankInformation: bank
        }
    
        // Aqui você pode retornar o objeto user ou qualquer outro valor
        return user;
    };

    async getUserByEmail(email: string): Promise<userProfile | null>{
        const result = await prisma.usuario.findUnique({
            where:{
                email: email
            },
            include: {
                endereco: true,
                dados_bancarios: true
            },
        })

        if (!result) {
            return null;
        }
    
        const img: userImg = {
            img: result.foto
        }

        const basicInformation: userBasicInformation = {
            firstName: result.nome,
            userAvaliation: 0 //temporario
        }

        const accountInformation: userAccountInformation = {
            lastName: result.nome_completo,
            email: result.email,
            cpf: result.cpf
        }

        const contact: userContactInformation = {
            phone: result.telefone,
            state: result.endereco[0].estado,
            city: result.endereco[0].cidade,
            address: result.endereco[0].rua,
            cep: result.endereco[0].cep
        }

        const bank: userBankInformation = {
            bankName: result.dados_bancarios[0].banco,
            agency: result.dados_bancarios[0].agencia,
            bankCode: result.dados_bancarios[0].numero_conta,
            account: result.dados_bancarios[0].tipo_conta
        }

        const user: userProfile = {
            userImg: img,
            userBasicInformation: basicInformation,
            userAccountInformation: accountInformation,
            userContactInformation: contact,
            userBankInformation: bank
        }
    
        // Aqui você pode retornar o objeto user ou qualquer outro valor
        return user;
    };

    async disableUser(id: number): Promise<string | null>{
        const result = await prisma.usuario.update({
            where:{
                id
            }, 
            select: {
                ativo: true
            },
            data: {
                ativo: true
            }
        })

        if (!result) {
            return null
        }

        return "Perfil desativado com sucesso"
    }

    async updateUserProfile(userBasicInformation: userBasicInformation, id: number): Promise<string | null>{
        const result = await prisma.usuario.update({
            where: {
                id: id
            },
            select:{
                nome: true,
            }, data:{
                nome: userBasicInformation.firstName
            }
        })

        if (!result) {
            return null
        }

        return "Sucesso ao atualizar usuário"
    }

    async updateProfileImage(id: number, userImg: userImg): Promise<string | null>{
        const result = await prisma.usuario.update({
            where: {
                id
            }, data:{
                foto: userImg.img
            }
        })
        
        if (!result) {
            return null
        }

        return "Sucesso ao atualizar a foto de usuario"
    }

    async updateBankInformation(id: number, userBank: userBankInformation): Promise<string | null>{
        const result = await prisma.dados_bancarios.update({
            where: {
                id_usuario: id
            },
            data: {
                agencia: userBank.agency,
                banco: userBank.bankName,
                tipo_conta: userBank.account,
                numero_conta: userBank.bankCode
            }
        })

        if (!result) {
            return null;
        }

        return "Sucesso ao atualizar usuário"
    }

    async updateAccountInformation(id: number, user: userAccountInformation): Promise<string | null>{
        const result = await prisma.usuario.update({
            where: {
                id
            },
            data: {
                cpf: user.cpf,
                email: user.email,
                nome_completo: user.lastName
            }
        })

        if (!result) {
            return null
        }

        return "Sucesso ao atualizar as informações da conta"
    }

    async updateContactInformation(id: number, id_user: number, user: userContactInformation): Promise<string | null>{
        const result = await prisma.endereco.update({
            where: {
                id,
                id_usuario: id_user
            },
            include:{
                usuario: {
                    where: {
                        id: id_user
                    },
                    select: {
                        telefone: true
                    }
                }
            },
            data: {
                usuario: {
                    update: {
                        telefone: user.phone
                    }
                },
                estado: user.state,
                cep: user.cep,
                cidade: user.city,
                rua: user.address
            }
        })

        if (!result) {
            return null
        }

        return "Sucesso ao atualizar as informações da conta"
    }
    
    async getUserHost(id: number): Promise</*createHostDto | null*/any>{
        const getHostData = prisma.usuario.findUnique({
            where:{
                id
            },
            select:{
                nome: true,
                nome_completo: true,
                foto: true,
            }
        })
        return getHostData
    }
    
    async avgAvaliation(id_user: number): Promise<any> {
        const result = prisma.avaliacao.findMany({
            where:{
                id_usuario_avaliado: id_user
            },
            select: {
                nota_cordialidade: true,
                nota_custo_beneficio: true,
                nota_exatidao_anuncio: true,
                nota_limpeza: true,
                nota_localizacao: true,
                nota_pontualidade: true,
                nota_seguiu_regras: true
            }
        })

        if (!result) {
            return null
        }

        return result
    }
}
