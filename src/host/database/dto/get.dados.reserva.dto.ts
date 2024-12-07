import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.instace";
import { StatusReserva } from "src/shared/enum/enums";
import { mapStatusReservaToPrisma } from "./maps/map.TsEnum.to.prismaEnum.";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Outros } from "src/host/anuncio/host.anuncio.service";

@Injectable()
export class DadosDeReserva{
    constructor( private readonly prisma: PrismaService, private readonly outros: Outros ){}

    async getDadosReserva(id_usuario: number){
        try{

            console.log('\nid usuario: ', id_usuario, typeof id_usuario)

            const res = await this.prisma.reserva.findMany({

                where: { id_usuario},
            });

            return res

        } catch(err){
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

    async getDadosURA(id_usuario: number){
        try {
            
            const reserva = await this.getDadosReserva(id_usuario);
            const anuncio = await this.outros.getDadosAnuncio(id_usuario);
            const usuario = await this.outros.getDadosDeUsuario(id_usuario);

            if( !reserva || reserva.length === 0 ){

                console.log('Entradas de reservas não encontradas! ')

            }else if( !anuncio || anuncio.length === 0){

                console.log('Entradas para anuncio não contradas')

            }else if( !usuario ){

                console.log(' Usuário não encontrado! ')

            }

            return {
                Reservas: {reserva},
                Anuncio: {anuncio},
                usuario: {usuario}
                }

        } catch (err) {
           
        if(err instanceof PrismaClientKnownRequestError){

            if(err?.code === 'P2025'){
                
                console.log('Alguma entrada não foi encontrada')
                
                throw new BadRequestException('Dados não encontrados.')
                }   

                console.log('Erro no prisma: ', err.code, err.meta, err.message)

                throw new BadRequestException('Erro ao buscar dados.')
            }

            console.log('Erro não tratado: ', err)

            throw new BadRequestException('Um erro desconhecido ocorreu.')
        }

    }

}
