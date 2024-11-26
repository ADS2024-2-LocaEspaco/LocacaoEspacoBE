import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.instace";
import { Checkin, Checkout, TipoDeNotificacao } from "src/shared/enum/enums";
import { Prisma } from "@prisma/client";
import { Notificacoes } from "./notificacoes.dto";


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

        }catch(error){

            console.log('Algum erro occoreu durante o processo de checkout ou notifciação ao usuario: ', error)

            throw new BadRequestException('Erro interno')

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

            console.log('Algum erro ocorreu durante o processo de notificação ou checkin: ', err)

            throw new BadRequestException('Erro interno')
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