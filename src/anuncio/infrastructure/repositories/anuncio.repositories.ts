import { anuncio, PrismaClient, reservas } from "@prisma/client";
import { getReservaDto } from "../database/dto/get-reserva.dto";
import { anuncioDto } from "../database/dto/anuncio.dto";

const prisma = new PrismaClient();

export async function getAnuncioById(id: number): Promise<anuncioDto | null> {
    const anuncio = await prisma.anuncio.findUnique({
        where: { id },
        select: {
            id: true,
            titulo: true,
            endereco: true,
            descricao: true,
            usuario_id: true,
            tipo_imoveis_id: true,
            tipo_espaco_id: true,
            quant_hospede: true,
            reservas: true,
            criado_em: true
        },
    });

    const anuncioData: anuncioDto = {
        id: anuncio?.id,
        titulo:  

    }
    return anuncio;
}

export async function getReservasById(id: number): Promise<getReservaDto[] | null> {
    const reservas = await prisma.reservas.findMany({
        where: { 
            anuncioId: id,
            status: 1
        },
        select:{
            id: true,
            status: true,
            data_entrada: true,
            data_saida: true,
        }
    });

    return reservas;
}
