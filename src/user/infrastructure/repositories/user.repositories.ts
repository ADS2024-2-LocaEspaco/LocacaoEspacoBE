import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { createHostDto } from '../database/dto/create-user-host.dto';
import { CreateUserDto } from '../database/dto/create-user.dto';
import { userProfile } from '../database/dto/user.profile.information';
import { userImg } from '../database/dto/user.profile.img';
import { userBasicInformation } from '../database/dto/user.profile.basic.information';
import { userAccountInformation } from '../database/dto/user.profile.account.information';
import { userBankInformation } from '../database/dto/user.profile.bank.information';
import { userContactInformation } from '../database/dto/user.profile.contact.information';

const prisma = new PrismaClient();
@Injectable()
export class UserRepository implements UserRepository{
    async getUserById(id: number): Promise<userProfile | null>{
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
            userAvaliation: 4.5 //temporario
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
            userAvaliation: 4.5 //temporario
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

    async updateBankInformation(id: number, userBank: userBankInformation): Promise<string | null>{
        const result = await prisma.dados_bancarios.update({
            where: {
                id_usuario: id
            },
            data: {
                id_usuario: id,
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
}
