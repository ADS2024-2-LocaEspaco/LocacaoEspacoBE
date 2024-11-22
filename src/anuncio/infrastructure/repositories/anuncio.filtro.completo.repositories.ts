import { PrismaClient } from "@prisma/client";
import { anuncioFiltroCompletoDto } from "../database/dto/anuncio.filtro.completo";
import { Injectable } from "@nestjs/common";

const prisma = new PrismaClient();

@Injectable()
export class AnuncioFiltroCompletoRepository implements AnuncioFiltroCompletoRepository{
    async getAdvancedSearch(filtroCompleto: anuncioFiltroCompletoDto): Promise<any> {
        const result = await prisma.anuncio.findMany({
            where: {
                tipo_imovel_id: {
                    in: filtroCompleto.tipo_imovel_id
                },
                valor_diaria: {
                    gte: filtroCompleto.min_value,
                    lte: filtroCompleto.max_value
                },
                banheiros: {
                    gte: filtroCompleto.bath_quantity 
                },
                quartos: {
                    gte: filtroCompleto.room_quantity
                },
                comodidade_id: {
                    in: filtroCompleto.comodidades
                },
                tipo_reserva_atual: {
                    equals: filtroCompleto.reserva
                },
                acessibilidade_id: {
                    in: filtroCompleto.accessibilities
                }
            }
        })

        if (!result) {
            return null
        }

        return result
    }
}