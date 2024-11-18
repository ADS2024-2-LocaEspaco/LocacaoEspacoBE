import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { AnuncioFiltroRepositoryInterface } from "src/anuncio/domain/repositories/anuncio.filtro.repository";

const prisma = new PrismaClient();

@Injectable()
export class AnuncioFiltroRepository implements AnuncioFiltroRepositoryInterface{
    async searchAnuncios(destino: string, checkin: Date, checkout: Date, hospedes: number): Promise<any> {
        const anuncios = await prisma.anuncio.findMany({
            include: {
                endereco: true,
            }
        })

        return anuncios;
    }

}