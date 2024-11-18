import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.instace";
import { StatusDeAceiteReserva, StatusPagamento, StatusReserva } from "src/shared/enum/enums";
import { mapStatusDeAceiteReservaToPrisma, mapStatusPagamentoToPrisma, mapStatusReservaToPrisma } from "./maps/map.TsEnum.to.prismaEnum.";


@Injectable()
export class AtualizarDadosDeReserva{
    constructor( private readonly prisma: PrismaService ){}

    async atualizarStatusDeReserva(id: number, status_reserva: StatusReserva){
        try{

            const status = mapStatusReservaToPrisma[status_reserva]

            const res = await this.prisma.reserva.update({
                where: { id },
                data:{ status_reserva: status }
            });

            console.log('Status recebido: ', status, typeof status, '\nStatus Banco: ', res.status_reserva, typeof res.status_reserva)

            if(status !== res.status_reserva){
                throw new BadRequestException('Erro ao autalizar reservas')
            }

            return res

        }catch(err){

            if(err instanceof BadRequestException){
                throw err
            }

            throw new NotFoundException('O servirdor não conseguiu atualizar/Econtrar reservas')
        }
    }

    async atualizarStatusDePagamento(id: number, status_pagamento: StatusPagamento){
        try{
            
            const status = mapStatusPagamentoToPrisma[status_pagamento]

            const res = await this.prisma.reserva.update({
                where: { id },
                data: { status_pagamento: status }
            })

            if( status !== res.status_pagamento ){
                throw new BadRequestException("Erro ao atualizar pagamento")
            }

            return res; 

        }catch(err){
            
            if( err instanceof BadRequestException){
                throw err
            }

            throw new NotFoundException('Erro ao tentar atualizar pagamento - erro no servidor')
        }

    }

    async aceitarNegarReservas(status_aceite: StatusDeAceiteReserva, id_reserva: number, id_usuario: number){
        try{

            const status = mapStatusDeAceiteReservaToPrisma[status_aceite]

            const res = await this.prisma.reserva.update({
                where: { id: id_reserva, id_usuario },
                data: {status_aceite: status}
            })

            console.log('resposta do update prisma: ', res)

            if(!res){
                throw new NotFoundException('Registro não encontrado!')
            }
            
            return res

        }catch(err){

            if(err instanceof NotFoundException){
                throw err
            }

            throw new BadRequestException("Erro ao tentar atualizar pagamento")

        }
    }
}