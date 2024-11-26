import { anuncio, PrismaClient, reserva } from "@prisma/client";
import { getReservaDto } from "../database/dto/get-reserva.dto";
import { GetComentariosDto } from "../database/dto/get-comentarios.dto";
import { getEnderecoDto } from "../database/dto/get-anuncio-endereco.dto";
import { getAnuncioDto } from "../database/dto/get-anuncio.dto";
import { getUsuarioDto } from "../database/dto/get-anuncio-usuario.dto";
import { getAnuncioFotosDto } from "../database/dto/get-anuncio-fotos.dto";
import { getComodidadesAnuncioDto } from "../database/dto/get-comodidade-anuncio.dto";

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
        dias_minimo_duracao:            Number(anuncio?.dias_minimo_duracao),
        dias_maximo_duracao:            Number(anuncio?.dias_maximo_duracao),
        dias_minimo_antecedencia:       Number(anuncio?.dias_minimo_antecedencia),
        politica_cancelamento:          Number(anuncio?.politica_cancelamento),
    } : null
    
    return dataAnuncio;
}

export async function getAnuncioById(id: number): Promise<getAnuncioDto | null> {
    const anuncio = await prisma.anuncio.findUnique({
        where: { id:  parseInt(id.toString(), 10) },
        select: {
            id: true,
            titulo: true,
            anfitriao: true
        },
    });

    const getAnuncio: getAnuncioDto = {
        id: anuncio?.id || null,
        titulo: anuncio?.titulo || null,
        usuario_id: anuncio?.anfitriao || null
    }
    return getAnuncio
}

export async function getQtdMaxHospede(id: number): Promise<getAnuncioDto | any> {
    const anuncio = await prisma.anuncio.findUnique({
        where: { id:  parseInt(id.toString(), 10) },
        select: {
            id: true,
            hospedes: true,
        },
    });

    return anuncio
}

export async function getComentariosAnuncio(id: number): Promise<getAnuncioDto | any> {
    const avaliacao = await prisma.avaliacao.findMany({
        where: { 
            id_anuncio_avaliado:  parseInt(id.toString(), 10) 
        },
        select: {
            id_usuario_avaliado: true,
            id_usuario_avaliador: true,
            id_anuncio_avaliado: true,
            comentario: true,
        },
    });

    return avaliacao
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

export async function getReservasById(id: number): Promise<getReservaDto[] | any> {
    const reservas = await prisma.reserva.findMany({
        where: {
            id_anuncio: id,
            status_reserva: 'Reservado'
        },
        select: {
            id: true,
            id_usuario: true,
            id_anuncio: true,
            status_reserva: true,
            data_inicial: true,
            data_final: true,
            criado_em: true
        }
    });

    return reservas;
}

export async function getDadosUsuarioAnfitriaoPorIdAnuncio(id: number): Promise<getUsuarioDto | null> {
    const anuncioId = parseInt(id.toString(), 10);

    const usuario = await prisma.usuario.findUnique({
        where: {
            id: anuncioId,
        },
        select: {
            id: true,
            nome: true,
            foto: true,
            criado_em: true
        },
    });

    // Verifica se o usuário foi encontrado
    if (!usuario) {
        return null;
    }

    // Verifica se 'criado_em' não é null antes de calcular
    const tempoCadastro = usuario.criado_em ? calcularTempoCadastro(usuario.criado_em) : "Data de cadastro não disponível";

    const anfitriao: getUsuarioDto = {
        id: Number(usuario.id),
        nome: usuario.nome,
        foto: usuario.foto,
        tempoCadastro: tempoCadastro
    }

    return anfitriao;
}

export async function getComodidadesByAnuncioId(id: number): Promise<getComodidadesAnuncioDto[]> {

    const anuncioId = Number(id);

    const comodidadesId = await prisma.anuncioComodidades.findMany({
        where: {
            anuncio_id: anuncioId
        },
        select: {
            comodidade_id: true
        }
    })

    const comodidades = await prisma.comodidades.findMany({
        where: {
            id:{
                in: comodidadesId.map((c: { comodidade_id: any; }) => c.comodidade_id)
            }
        }

    })

    const listaDTOs: getComodidadesAnuncioDto[] = comodidades.map((c: { id: any; comodidade: any; icone: any; }) =>({
        id: c.id,
        comodidades: c.comodidade,
        icone: c.icone

    }))

    return listaDTOs
}

export async function getFotosByAnuncioId(id: number): Promise<getAnuncioFotosDto[] | null> {
        
    const anuncioId = Number(id);

    const fotosId = await prisma.anuncioFotos.findMany({
        where:{
            anuncio_id: anuncioId
        },
        select: {
            foto_id:true
        }
    })


    const fotos = await prisma.fotos.findMany({
        where: {

            id: {
                in: fotosId.map((f: { foto_id: any; }) => f.foto_id)
            }
        }

    })

    const listaDTOs: getAnuncioFotosDto[] = fotos.map((f: { id: any; url: any; }) => ({
        id: f.id,
        url: f.url

    }))

    return listaDTOs
}

function calcularTempoCadastro(criadoEm: Date): string {
    const agora = new Date();
    const tempoCadastro = agora.getTime() - criadoEm.getTime(); // Diferença em milissegundos

    const segundos = Math.floor(tempoCadastro / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor(dias / 30); // Aproximando um mês como 30 dias
    const anos = Math.floor(meses / 12);

    // Retornando um formato legível
    if (anos > 0) {
        return `${anos} ano(s)`;
    } else if (meses > 0) {
        return `${meses} mês(es)`;
    } else if (dias > 0) {
        return `${dias} dia(s)`;
    } else if (horas > 0) {
        return `${horas} hora(s)`;
    } else if (minutos > 0) {
        return `${minutos} minuto(s)`;
    } else {
        return `${segundos} segundo(s)`;
    }
}
