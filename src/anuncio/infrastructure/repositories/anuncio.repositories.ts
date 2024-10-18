import { anuncio, PrismaClient, reservas } from "@prisma/client";
import { getReservaDto } from "../database/dto/get-reserva.dto";
import { getAnuncioDto } from "../database/dto/get-anuncio.dto";
import { getUsuarioDto } from "../database/dto/get-anuncio-usuario.dto";

const prisma = new PrismaClient();
export async function getAnuncioById(id: number): Promise< getAnuncioDto | null> {
    const anuncio = await prisma.anuncio.findUnique({
        where: { id },
        select: {
            id: true,
            titulo: true,
            usuario_id: true
        },
    });

    return anuncio;
}


export async function getReservasById(id: number): Promise<getReservaDto[] | null> {
    const reservas = await prisma.reservas.findMany({
        where: { 
            anuncio_id: id,
            status_reserva: 1
        },
        select:{
            id: true,
            status_reserva: true,
            data_inicial: true,
            data_final: true,
            criado_em: true
        }
    });

    return reservas;
}

export async function getUsuarioByUsuarioId(id: string): Promise<getUsuarioDto | null> {
    const usuario = await prisma.usuario.findUnique({
        where: { id },
        select: {
            id: true,
            nome: true,
            endereco: {
                take:1,
                select: {
                    latitude: true,
                    longitude: true,
                },
            },
        },
    });

    // Verifica se o usuário foi encontrado
    if (!usuario) {
        return null;
    }

    return {
        id: usuario.id,
        nome: usuario.nome,
        endereco: usuario.endereco.length > 0 ? {
            latitude: usuario.endereco[0].latitude,
            longitude: usuario.endereco[0].longitude,
        } : null,
    } as getUsuarioDto;
}

