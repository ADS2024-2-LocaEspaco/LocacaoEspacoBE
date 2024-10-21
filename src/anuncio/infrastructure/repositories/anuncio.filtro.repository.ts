import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { AnuncioFiltroRepositoryInterface } from "src/anuncio/domain/repositories/anuncio.filtro.repository";

const prisma = new PrismaClient();

@Injectable()
export class AnuncioFiltroRepository implements AnuncioFiltroRepositoryInterface{
    async searchAnuncios(destino: string, checkin: Date | string, checkout: Date | string, hospedes: number): Promise<any> {
        const anuncios = await prisma.anuncio.findMany({
            where: {
                OR: [
                    {endereco: {some: {cidade: destino}},
                        AND: [
                            {data_checkin: checkin},
                            {data_checkout: checkout},
                            {hospedes: hospedes}
                    ]},
                {
                    AND: [
                        {data_checkin: checkin},
                        {data_checkout: checkout},
                        {hospedes: hospedes}
                    ]
                },
                {endereco: {some: {cidade: destino}}}
            ] 
            },

            select: {
                id: true,
                titulo: true,
                hospedes: true,
                endereco: {
                    select: {
                        id_anuncio: true,
                        cidade: true
                    }
                }
            }
        })

        return anuncios;
    }

}