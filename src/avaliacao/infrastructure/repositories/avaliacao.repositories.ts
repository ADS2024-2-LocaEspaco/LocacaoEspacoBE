import { PrismaClient } from "@prisma/client";
import {GetComentariosDto} from "../database/dto/get-comentarios.dto";

const prisma = new PrismaClient();

export async function getComentariosAnuncio(anuncio_id: number): Promise<GetComentariosDto[] | object>{
    const comentarios = await prisma.reservas.findMany({
        where:{
            anuncio_id,
            status_reserva: 1,
            avaliacao:{
                some:{
                    avaliado: 1,
                }
            }
        },
        select:{
            id: true,
            usuario:{
                select:{
                    email: true,
                    nome: true,
                    nome_completo: true,
                    img: true,
                }
            },
            avaliacao: true,
        }
    })

    let valores = comentarios.map((comentario) => {
        return {
            ...comentario,
            avaliacao: comentario.avaliacao.map((avalia) => {
                return {
                    comentario: avalia.comentario,
                    nota_cordialidade: Number(avalia.nota_cordialidade),
                    nota_exatidao_anuncio: Number(avalia.nota_exatidao_anuncio),
                    nota_limpeza: Number(avalia.nota_limpeza),
                    nota_localizacao: Number(avalia.nota_localizacao),
                    nota_pontualidade: Number(avalia.nota_pontualidade),
                    nota_seguiu_regras: Number(avalia.nota_seguiu_regras),
                };
            }),
        };
    });

    return valores
}

    

