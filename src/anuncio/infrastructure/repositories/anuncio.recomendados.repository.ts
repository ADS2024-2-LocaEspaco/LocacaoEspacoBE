import { Injectable } from "@nestjs/common";
import { anunciosRecomendadosDTO } from "../database/dto/get-anuncios-recomendados.dto";
import { AnunciosRecomendadosRepositoryInterface } from "src/anuncio/domain/repositories/anuncio.recomendados.repository";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AnunciosRecomendadosRepository implements AnunciosRecomendadosRepositoryInterface{
    async getAnuncios(idUser: number): Promise<anunciosRecomendadosDTO[] | null> {
        const anuncios = await prisma.anuncio.findMany({
            where: {
                reserva: {some: {id_usuario: idUser}}
            }
        });

        return null;
    }
}