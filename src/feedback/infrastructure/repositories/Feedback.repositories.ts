import { PrismaClient } from "@prisma/client";
import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from "../database/dto/create-feedback.dto";

const prisma = new PrismaClient();

@Injectable()
export class feedbackRepository implements feedbackRepository{
    async getComentariosAnuncio(anuncioId: number): Promise<CreateFeedbackDto[] | string>{
        const avaliacoes = await prisma.avaliacao.findMany({
            where:{
                id_anuncio_avaliado: anuncioId
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
                id_anuncio_avaliado: true,
                comentario: true,
                criado_em: false,
            }
        })

        const comentarios: CreateFeedbackDto[] = avaliacoes.map(avaliacao => ({
            id: avaliacao.id || null,
            nota_limpeza: Number(avaliacao.nota_limpeza) || null,
            nota_exatidao_anuncio: Number(avaliacao.nota_exatidao_anuncio) || null,
            nota_custo_beneficio: Number(avaliacao.nota_custo_beneficio) || null,
            nota_localizacao: Number(avaliacao.nota_localizacao) || null,
            nota_seguiu_regras: Number(avaliacao.nota_seguiu_regras) || null,
            nota_pontualidade: Number(avaliacao.nota_pontualidade) || null,
            nota_cordialidade: Number(avaliacao.nota_cordialidade) || null,
            id_anuncio_avaliado: avaliacao.id_anuncio_avaliado || null, //id_anuncio_avaliado
            comentario: avaliacao.comentario || null,
        }));

        // Retorna o array de comentários ou uma mensagem se não houver nenhum
        return comentarios.length > 0 ? comentarios : "Nenhum comentário encontrado.";
    }
}
