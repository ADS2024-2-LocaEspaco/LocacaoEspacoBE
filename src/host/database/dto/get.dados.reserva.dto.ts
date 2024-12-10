import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.instace";
import { StatusReserva } from "src/shared/enum/enums";
import { mapStatusReservaToPrisma } from "./maps/map.TsEnum.to.prismaEnum.";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Outros } from "src/host/anuncio/host.anuncio.service";

@Injectable()
export class DadosDeReserva{
    constructor( private readonly prisma: PrismaService, private readonly outros: Outros ){}

    async getDadosReserva(id_anuncio: number){
        try{

            console.log('\nid usuario: ', id_anuncio, typeof id_anuncio)

            const res = await this.prisma.reserva.findMany({

                where: {id_anuncio},
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

    async getDadosURA(id_usuario: number) {
        try {
            // Buscar os anúncios do usuário
            const anuncios = await this.outros.getDadosAnuncio(id_usuario);
    
            console.log('Anuncios: ', anuncios);
    
            if (!anuncios || anuncios.length === 0) {

                console.log('Entradas para anúncio não encontradas');
                throw new BadRequestException('Erro ao procurar por anúncios fk');
            }
    
            const resultados = []; // Para armazenar os dados finais
    
            // Iterar sobre os anúncios e buscar as reservas e usuários
            for (const anuncio of anuncios) {
                const id_anuncio = anuncio.id;
                console.log('ID Anuncio: ', id_anuncio);
    
                // Buscar as reservas para o anúncio
                const reservas = await this.getDadosReserva(id_anuncio);
    
                if (!reservas || reservas.length === 0) {
                    console.log('Reservas não encontradas para o anúncio ID: ', id_anuncio);
                    continue; // Se não encontrar reservas, pula para o próximo anúncio
                }
    
                console.log('Reservas para o anúncio ID: ', id_anuncio, reservas);
    
                // Para cada reserva, buscar o usuário correspondente
                const reservasComUsuarios = [];
                for (const reserva of reservas) {

                    const usuario = await this.outros.getDadosDeUsuario(reserva.id_usuario);
    
                    if (!usuario) {
                        console.log('Usuário não encontrado para a reserva ID: ', reserva.id);
                        continue; // Se o usuário não for encontrado, pula para a próxima reserva
                    }
    
                    // Adiciona a reserva com o usuário
                    reservasComUsuarios.push({
                        reserva,
                        usuario
                    });
                }
    
                // Se houver reservas com usuários, adicione no resultado
                if (reservasComUsuarios.length > 0) {
                    resultados.push({
                        anuncio,
                        reservas: reservasComUsuarios
                    });
                }
            }
    
            // Retorna os resultados finais
            return resultados;
    
        } catch (err) {
           
            if(err instanceof PrismaClientKnownRequestError){

                if(err?.code === 'P2025'){
                    
                    console.log('Alguma entrada não foi encontrada')
                    
                    throw new BadRequestException('Dados não encontrados.')
                    }   

                    console.log('Erro no prisma: ', err.code, err.meta, err.message)

                    throw new BadRequestException('Erro ao buscar dados.')

            } else if(err instanceof BadRequestException){
                
                throw err
            }

                console.log('Erro não tratado: ', err)

                throw new BadRequestException('Um erro desconhecido ocorreu.')
            }

    }

}
