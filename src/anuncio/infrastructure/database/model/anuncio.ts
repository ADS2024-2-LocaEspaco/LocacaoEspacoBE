import { Anuncio, PrismaClient, Reserva } from "@prisma/client";
import { CreateReservaDto } from "../../../../shared/infrastructure/dto/create-reserva.dto";

const prisma = new PrismaClient();

export async function getAnuncioById(id: string): Promise<Anuncio | null> {
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
}

export async function getReservasById(id: string): Promise<CreateReservaDto[] | null> {
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
}
