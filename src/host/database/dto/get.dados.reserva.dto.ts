import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.instace";
import { StatusReserva } from "src/shared/enum/enums";
import { mapStatusReservaToPrisma } from "./maps/map.TsEnum.to.prismaEnum.";

@Injectable()
export class DadosDeReserva{
    constructor( private readonly prisma: PrismaService ){}

    async getDadosReserva(id_usuario: number){
        try{

            console.log('\nid usuario: ', id_usuario, typeof id_usuario)

            const res = await this.prisma.reserva.findMany({

                where: { id_usuario},
                select: {
                    id: true,
                    id_anuncio: true,
                    id_usuario: true,
                    qtd_adultos: true,
                    qtd_criancas: true,
                    qtd_bebes: true,
                    qtd_pets: true,
                    data_inicial: true,
                    data_final: true,
                    estadia_minima: true,
                    estadia_maxima: true,
                    status_reserva: true,
                    status_pagamento: true,
                    multa: true,
                    cancelamento: true,
                    criado_em: true
                }
            });

            if(!res || res.length === 0){
                throw new NotFoundException('Reserva não encontrada!');
            }

            return res

        } catch(err){
            
            if( err instanceof NotFoundException ){
                throw err
            }

            throw new BadRequestException('Erro ao buscar dados')
        }
    } 

    async getHistorico(status_reserva: StatusReserva, de: Date, ate: Date){
        try{
            const stt = mapStatusReservaToPrisma[status_reserva]

            const res = await this.prisma.reserva.findMany({
                where:{
                    data_final:{
                        gte: de,
                        lte: ate
                    },
                    status_reserva: stt
                },
                select:{
                    id: true,
                    id_anuncio: true,
                    id_usuario: true,
                    qtd_adultos: true,
                    qtd_criancas: true,
                    qtd_bebes: true,
                    qtd_pets: true,
                    data_inicial: true,
                    data_final: true,
                    estadia_minima: true,
                    estadia_maxima: true,
                    status_reserva: true,
                    status_pagamento: true,
                    multa: true,
                    cancelamento: true,
                    criado_em: true
                }
            })

            if(!res || res.length === 0){

                throw new NotFoundException('Histórico de reservas não encontrados')

            }

            return res

        } catch(err){

          if(err instanceof NotFoundException){

            throw err

          }
            throw new BadRequestException(' Erro ao buscar por historico de reservas');
        }
    }
}
