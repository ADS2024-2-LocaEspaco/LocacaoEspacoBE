import { PrismaClient } from "@prisma/client";
import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from "../database/dto/create-feedback.dto";

const prisma = new PrismaClient();

@Injectable()
export class feedbackRepository implements feedbackRepository{
    async getComentariosAnuncio(anuncioId: number): Promise<CreateFeedbackDto[] | string>{
        const avaliacoes = await prisma.avaliacao.findMany({
            where:{
                reservas_id: anuncioId
            },
            select:{
                id: true,
                nota_limpeza: true,
                nota_exatidao_anuncio: true,
                nota_custo_beneficio: true,
                nota_localizacao: true,
                nota_seguiu_regras: true,
                nota_pontualidade: true,
                nota_cordialidade: true,
                reservas_id: true,
                comentario: true,
                criado_em: false,
            }
        })

        const comentarios: CreateFeedbackDto[] = avaliacoes.map(avaliacao => ({
            id: avaliacao.id,
            nota_limpeza: avaliacao.nota_limpeza || null,
            nota_exatidao_anuncio: avaliacao.nota_exatidao_anuncio || null,
            nota_custo_beneficio: avaliacao.nota_custo_beneficio || null,
            nota_localizacao: avaliacao.nota_localizacao || null,
            nota_seguiu_regras: avaliacao.nota_seguiu_regras || null,
            nota_pontualidade: avaliacao.nota_pontualidade || null,
            nota_cordialidade: avaliacao.nota_cordialidade || null,
            reservas_id: avaliacao.reservas_id,
            comentario: avaliacao.comentario,
        }));

        // Retorna o array de comentários ou uma mensagem se não houver nenhum
        return comentarios.length > 0 ? comentarios : "Nenhum comentário encontrado.";
    }
}
