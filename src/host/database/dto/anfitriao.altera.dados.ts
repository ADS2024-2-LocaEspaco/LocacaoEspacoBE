import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.instace";
import { Checkin, Checkout, TipoDeNotificacao } from "src/shared/enum/enums";
import { Prisma } from "@prisma/client";
import { Notificacoes } from "./notificacoes.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


@Injectable()
export class AlteracoesAnfitriao{
    constructor (private readonly prisma: PrismaService, private readonly notify: Notificacoes){}

    async checkoutDoAnfitriao( id_reserva: number, id_usuario: number, mensagem: string ){
        try{   
            
            console.log('ID reserva: ', id_reserva, typeof(id_reserva), '\nID usuario: ', id_usuario, typeof(id_usuario), '\nMesagem: ', mensagem, typeof(mensagem))

            const checkout = await this.forcarCheckout(id_reserva);

            const tipo = TipoDeNotificacao.Checkout_realizado_anfitriao

            const notificacao = await this.notify.notificaUsuario(id_usuario, id_reserva, tipo, mensagem);

            if(!notificacao){

                throw new Error('Notificação não realizada');

            }

            console.log("Notificação: ", notificacao)

            return {mensagem:"Checkout Realizado, Notificação enviada.", checkout, notificacao}

        }catch(err){
            if( err.code === 'P2025'){

                console.log('ID de usuário não encontrado. ')

                throw new NotFoundException('Dados de usuário não encontrados.')

            }else if( err instanceof PrismaClientKnownRequestError ){
                
                console.log('Erro no prisma: ', err.code, err.meta)

                throw new BadRequestException('Algum erro ocorreu ao tentar recuperar os dados de reservas deste usuário')
            }

            console.log('Erro não tratado: ', err)

            throw new BadRequestException('Erro desconhecido.')
        }
    } 

    async checkinDoAnfitriao(id_reserva: number, id_usuario: number, mensagem: string){

        try{

        const checkin = await this.forcarCheckin( id_reserva )

        const tipo = TipoDeNotificacao.Checkin_realizado_anfitriao

        const notificacao = await this.notify.notificaUsuario(id_usuario, id_reserva, tipo, mensagem)

        if(!notificacao){

            throw new Error('Notificação não realizada');

        }

        console.log('Notificação: ', notificacao)

        return { mensagem: "Checkin realizado, notificação enviada. ", checkin, notificacao}
        
        }catch(err){
            if( err.code === 'P2025'){

                console.log('ID de usuário não encontrado. ')

                throw new NotFoundException('Dados de usuário não encontrados.')

            }else if( err instanceof PrismaClientKnownRequestError ){
                
                console.log('Erro no prisma: ', err.code, err.meta)

                throw new BadRequestException('Algum erro ocorreu ao tentar recuperar os dados de reservas deste usuário')
            }

            console.log('Erro não tratado: ', err)

            throw new BadRequestException('Erro desconhecido.')
        }
    } 

    async forcarCheckout( id_reserva: number ) {
        try{

            const checkout = await this.prisma.reserva.update({
                where: {
                    id: id_reserva
                },
                data:{
                    checkout: Checkout.Realizado_por_anfitriao
                }
            })

            return checkout;

        }catch(err){

            if(err instanceof Prisma.PrismaClientKnownRequestError){
                
                console.log('Erro no prisma: ', err.code, err.meta)
            }

            console.log('Erro: ', err)

            throw new BadRequestException('Um erro ocorreu ao fazer checkout')
        }
    }

    async forcarCheckin( id_reserva: number ) {
        try{
            const checkin = await this.prisma.reserva.update({
                where: {
                    id: id_reserva
                }, 
                data:{
                    checkin: Checkin.Realizado_por_anfitriao
                }
            })

            return checkin;
        }catch (err){

            if(err instanceof Prisma.PrismaClientKnownRequestError){

                console.log('Erro no prisma: ', err.code, err.meta)

            }

            console.log('Erro: ', err)

            throw new BadRequestException('Um erro ocorreu ao realizar checkin')
        }
    }
    
}