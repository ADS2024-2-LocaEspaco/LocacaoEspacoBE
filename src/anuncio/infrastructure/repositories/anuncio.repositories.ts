import { anuncio, PrismaClient, reservas } from "@prisma/client";
import { getReservaDto } from "../database/dto/get-reserva.dto";

const prisma = new PrismaClient();

/*export async function getAnuncioById(id: Number): Promise<anuncio | null> {
    const anuncio = await prisma.anuncio.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            street: true,
            bairro: true,
            cidade: true,
            cep: true,
            numero: true,
            complement: true,
            latitude: true,
            longitude: true,
            description: true,
            userId: true,
            tipoImovelId: true,
            tipoEspacoId: true,
            qtdMaxHospedes: true,
            qtdAvaliacoes: true,
            mediaAvaliacao: true,
            feedback: true,
            createdAt: true
        },
    });

    return anuncio;
}*/

/*export async function getReservasById(id: string): Promise<getReservaDto[] | null> {
    const reservas = await prisma.reserva.findMany({
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
}*/
