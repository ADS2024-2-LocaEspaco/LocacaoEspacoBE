import { Anuncio, PrismaClient, User } from "@prisma/client";
import { AnuncioEntity } from "src/anuncio/domain/entities/anuncio.entity";

const prisma = new PrismaClient();

export async function getAnuncioById(id: string): Promise<Anuncio | null> {
    // Execute a consulta e aguarde o resultado
    const anuncio = await prisma.anuncio.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            title: true,
            address: true,  // Certifique-se de incluir todos os campos necessários
            description: true,
            userId: true,
            tipoImovelId: true,
            tipoEspacoId: true,
            qtdMaxHospedes: true,
            feedback: true,
            createdAt: true
        },
    });
    
    // Retorne o resultado da consulta
    return anuncio;
}



    

