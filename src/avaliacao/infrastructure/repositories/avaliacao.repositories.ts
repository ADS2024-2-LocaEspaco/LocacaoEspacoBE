import { avaliacao, PrismaClient } from "@prisma/client";
import { GetComentariosDto } from "../database/dto/get-comentarios.dto";

const prisma = new PrismaClient();

export async function getComentariosAnuncio(anuncio_id: number): Promise<GetComentariosDto[] | any>{
    const comentarios = prisma.reservas.findMany({
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
                    img: true,
                }
            },
            avaliacao:{
                select:{
                    comentario: true,
                    nota_cordialidade: true,
                    nota_custo_beneficio: true,
                    nota_exatidao_anuncio: true,
                    nota_limpeza: true,
                    nota_localizacao: true,
                    nota_pontualidade: true,
                    nota_seguiu_regras: true,
                }
            }
        }
        
    })
    
    console.log(await comentarios)
    return comentarios
}

    

