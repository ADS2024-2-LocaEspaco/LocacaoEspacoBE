import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { userProfile } from '../database/dto/user.profile.information';

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
                instituicao_financeira: true
            },
        })

        if (!result) {
            // Retornar uma mensagem ou outro valor caso o usuário não seja encontrado
            return null;
        }
    
        const user: userProfile = {
            firstName: result.nome,
            lastName: result.nome_completo,
            picture: result.img,
            email: result.email,
            cpf: result.cpf,
            phone: result.fone,
            agency: result.ag,
            account: result.cc,
            bankName: result.instituicao_financeira?.nome_instituicao,
            bankCode: result.instituicao_financeira?.codigo_instituicao,
            state: result.endereco[0]?.estado,
            city: result.endereco[0]?.cidade,
            address: result.endereco[0]?.bairro,
            cep: result.endereco[0]?.cep
        };
    
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
                instituicao_financeira: true
            },
        })

        if (!result) {
            return null;
        }
    
        const user: userProfile = {
            firstName: result.nome,
            lastName: result.nome_completo,
            picture: result.img,
            email: result.email,
            cpf: result.cpf,
            phone: result.fone,
            agency: result.ag,
            account: result.cc,
            bankName: result.instituicao_financeira?.nome_instituicao,
            bankCode: result.instituicao_financeira?.codigo_instituicao,
            state: result.endereco[0]?.estado,
            city: result.endereco[0]?.cidade,
            address: result.endereco[0]?.bairro,
            cep: result.endereco[0]?.cep
        };
    
        // Aqui você pode retornar o objeto user ou qualquer outro valor
        return user;
    };

    async updateUserProfile(user: userProfile, id: number): Promise<string>{
        const result = await prisma.usuario.update({
            where: {
                id: id
            },
            select:{
                instituicao_financeira_id: true
            },
            data: {
                nome: user.firstName,
                nome_completo: user.lastName || "",
                img: user.picture,
                email: user.email,
                cpf: user.cpf,
                fone: user.phone,
                ag: user.agency,
                cc: user.account,
            }
        })

        return "Sucesso ao atualizar usuário"
    }

    async updateBankInformation(id: number, user: userProfile): Promise<string | null>{
        const result = await prisma.usuario.update({
            where: {
                id: id
            },
            data: {
                nome: user.firstName,
                nome_completo: user.lastName || "",
                img: user.picture,
                email: user.email,
                cpf: user.cpf,
                fone: user.phone,
                ag: user.agency,
                cc: user.account,
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
                img: true,
            }
        })
        return getHostData
    }    
}
