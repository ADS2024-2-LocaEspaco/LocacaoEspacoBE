import { PrismaClient } from "@prisma/client";
import {GetComentariosDto} from "../database/dto/get-comentarios.dto";

const prisma = new PrismaClient();

export async function getComentariosAnuncio(id_anuncio_avaliado: number): Promise<GetComentariosDto[] | object>{
    const comentarios = await prisma.avaliacao.findMany({
        where:{
            id_anuncio_avaliado,
        },
        select:{
            id: true,
            usuario_usuario_avaliacao_idToavaliacao:{
                select:{
                    email: true,
                    nome: true,
                    nome_completo: true,
                    foto: true,
                }
            },
        }
    })

    // let valores = comentarios.map((comentario) => {
    //     return {
    //         ...comentario,
    //         avaliacao: comentario.avaliacao.map((avalia) => {
    //             return {
    //                 comentario: avalia.comentario,
    //                 nota_cordialidade: Number(avalia.nota_cordialidade),
    //                 nota_exatidao_anuncio: Number(avalia.nota_exatidao_anuncio),
    //                 nota_limpeza: Number(avalia.nota_limpeza),
    //                 nota_localizacao: Number(avalia.nota_localizacao),
    //                 nota_pontualidade: Number(avalia.nota_pontualidade),
    //                 nota_seguiu_regras: Number(avalia.nota_seguiu_regras),
    //             };
    //         }),
    //     };
    // });

    return comentarios
}

    

