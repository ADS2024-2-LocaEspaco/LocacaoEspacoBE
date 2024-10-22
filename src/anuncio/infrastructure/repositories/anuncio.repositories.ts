import { PrismaClient } from "@prisma/client";
import { getEnderecoDto } from "../database/dto/get-anuncio-endereco.dto";
import { getReservaDto } from "../database/dto/get-reserva.dto";
import { getAnuncioDto } from "../database/dto/get-anuncio.dto";
import { getUsuarioDto } from "../database/dto/get-anuncio-usuario.dto";

const prisma = new PrismaClient();

export async function getAnuncioById(id: number): Promise<getAnuncioDto | null> {
    const anuncio = await prisma.anuncio.findUnique({
        where: { id },
        select: {
            id: true,
            titulo: true,
            anfitriao: true
        },
    });

    const getAnuncio: getAnuncioDto = {
        id: anuncio?.id || null,
        titulo: anuncio?.titulo || null,
        usuario_id: anuncio?.anfitriao || null
    }

    return getAnuncio
}

export async function getReservasById(id: number): Promise<getReservaDto[] | null> {
    const reservas = await prisma.reserva.findMany({
        where: { 
            id_anuncio: id,
            status_reserva: 'Reservado'
        },
        select:{
            id: true,
            id_usuario: true,
            id_anuncio: true,
            status_reserva: true,
            data_inicial: true,
            data_final: true,
            criado_em: true
        }
    });

    // return reservas;
    return null
}

export async function getUsuarioByUsuarioId(id: number): Promise<getUsuarioDto | null> {
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

    const endereco: getEnderecoDto = {
        latitude: usuario.endereco[0].latitude,
        longitude: usuario.endereco[0].longitude

    }

    const anfitriao: getUsuarioDto = {
        id: usuario.id,
        nome: usuario.nome,
        endereco: endereco
    }

    return anfitriao
}