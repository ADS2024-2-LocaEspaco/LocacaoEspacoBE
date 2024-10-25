import { anuncio, PrismaClient, reservas } from "@prisma/client";
import { getReservaDto } from "../database/dto/get-reserva.dto";
import { GetComentariosDto } from "../database/dto/get-comentarios.dto";

const prisma = new PrismaClient();

export async function getAnuncio(id: number): Promise<any | null> {
    let anuncio = await prisma.anuncio.findUnique({
        where: { 
            id 
        },
    });

    let dataAnuncio = {
        ...anuncio,
        quant_quartos:  Number(anuncio?.quant_quartos),
        quant_banheiro:  Number(anuncio?.quant_banheiro),
        quant_hospede:  Number(anuncio?.quant_hospede),
        quant_cama:  Number(anuncio?.quant_cama),
        quant_pet:  Number(anuncio?.quant_pet),
        quant_diaria_min:  Number(anuncio?.quant_diaria_min),
        quant_diaria_max:  Number(anuncio?.quant_diaria_max),
        polit_cancelamento:  Number(anuncio?.polit_cancelamento),
        temp_antec_reserva:  Number(anuncio?.temp_antec_reserva),
    }
    
    return dataAnuncio;
}

export async function getPoliticaCancelamento(id: number): Promise<any | null> {
    let anuncio = await prisma.anuncio.findUnique({
        where: { 
            id 
        },
    });

    let dataAnuncio = {
        polit_cancelamento:  Number(anuncio?.polit_cancelamento),
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
    const reservas = await prisma.reservas.findMany({
        where: { 
            anuncio_id: id
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
            quant_hospede: true
        }
    });

    return Number(data?.quant_hospede);
}

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
