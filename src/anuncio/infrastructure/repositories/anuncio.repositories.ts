import { anuncio, PrismaClient, reserva } from "@prisma/client";
import { getReservaDto } from "../database/dto/get-reserva.dto";
import { GetComentariosDto } from "../database/dto/get-comentarios.dto";

const prisma = new PrismaClient();

export async function getAnuncio(id: number): Promise<any | null> {
    let anuncio = await prisma.anuncio.findUnique({
        where: { 
            id 
        },
    });

    let dataAnuncio = anuncio != null ? {
        ...anuncio,
        quartos:                        Number(anuncio?.quartos),
        banheiros:                      Number(anuncio?.banheiros),
        hospedes:                       Number(anuncio?.hospedes),
        qtd_diaria_min:                 Number(anuncio?.qtd_diaria_min),
        qtd_diaria_max:                 Number(anuncio?.qtd_diaria_max),
        politica_cancelamento:          Number(anuncio?.politica_cancelamento),
        tempo_antecipado_para_reserva:  Number(anuncio?.tempo_antecipado_para_reserva),
    } : null
    
    return dataAnuncio;
}

export async function getPoliticaCancelamento(id: number): Promise<any | null> {
    let anuncio = await prisma.anuncio.findUnique({
        where: { 
            id 
        },
    });

    let dataAnuncio = {
        politica_cancelamento:  Number(anuncio?.politica_cancelamento),
    }
    
    return dataAnuncio;
}

export async function getMediaNotaAnuncio(id: number): Promise<any | null> {
    const reservas = await prisma.avaliacao.aggregate({
        where: { 
            id
        },
        _avg:{
            nota_limpeza: true,
            nota_cordialidade: true,
            nota_custo_beneficio: true,
            nota_exatidao_anuncio: true,
            nota_localizacao: true,
            nota_pontualidade: true,
            nota_seguiu_regras: true,
        },
    });

    return reservas;
}

export async function getReservas(id: number): Promise<any | null> {
    const reservas = await prisma.reserva.findMany({
        where: { 
            id_anuncio: id
        },
        select:{
            data_final: true,
            data_inicial: true
        }
    });

    return reservas;
}

export async function getQtdMaxHospede(id: number): Promise<any | null> {
    const data = await prisma.anuncio.findUnique({
        where: { 
            id
        },
        select:{
            hospedes: true
        }
    });

    return Number(data?.hospedes);
}

export async function getComentariosAnuncio(id_anuncio_avaliado : number): Promise<GetComentariosDto[] | object>{
    const comentarios = await prisma.avaliacao.findMany({
        where:{
            id_anuncio_avaliado,
        },
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
