import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { AnuncioFiltroRepositoryInterface } from "src/anuncio/domain/repositories/anuncio.filtro.repository";

const prisma = new PrismaClient();

@Injectable()
export class AnuncioFiltroRepository implements AnuncioFiltroRepositoryInterface{
    async searchAnuncios(destino: string, checkin: Date | null, checkout: Date | null, hospedes: number): Promise<any> {
        const anuncios = await prisma.anuncio.findMany({
            where: {
                OR: [
                    {endereco: {some: {cidade: destino}},
                        AND: [
                            {checkin_inicio: checkin},
                            {checkout: checkout},
                            {quant_hospede: hospedes}
                    ]},
                {
                    AND: [
                        {checkin_inicio: checkin},
                        {checkout: checkout},
                        {quant_hospede: hospedes}
                    ]
                },
                {endereco: {some: {cidade: destino}}}
            ] 
            },

            select: {
                id: true,
                titulo: true,
                quant_hospede: true,
                endereco: {
                    select: {
                        anuncio_id: true,
                        cidade: true
                    }
                }
            }
        })

        return anuncios;
    }

}