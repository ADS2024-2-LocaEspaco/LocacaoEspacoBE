import { Feedback, PrismaClient } from "@prisma/client";
import { CreateFeedbackDto } from "../database/dto/create-feedback.dto";

const prisma = new PrismaClient();

export async function getComentariosAnuncio(anuncioId: string): Promise<CreateFeedbackDto[]>{
    const comentarios = prisma.feedback.findMany({
        where:{
            anuncioId
        },
        select:{
            id: true,
            descricao: true,
            nota: true,
            anuncioId: true,
            userId: true,
            createdAt: false,
            user: {
                select: {
                    photo: true,
                    fullname: true,
                }
            }
        }
        
    })
    return comentarios
}

    

