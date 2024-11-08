import { PrismaClient } from "@prisma/client";
import { getEnderecoDto } from "../database/dto/get-anuncio-endereco.dto";
import { getReservaDto } from "../database/dto/get-reserva.dto";
import { getAnuncioDto } from "../database/dto/get-anuncio.dto";
import { getUsuarioDto } from "../database/dto/get-anuncio-usuario.dto";
import { getComodidadesAnuncioDto } from "../database/dto/get-comodidade-anuncio.dto"
const prisma = new PrismaClient();

export async function getAnuncioById(id: number): Promise<getAnuncioDto | null> {
    const anuncioId = parseInt(id.toString(), 10);

    const anuncio = await prisma.anuncio.findUnique({
        where: { id:anuncioId },
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

export async function getReservasById(id: number): Promise<getReservaDto[] | null> {
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

export async function getComodidadesByAnuncioId(id:number): Promise<getComodidadesAnuncioDto[]> {

    const anuncioId = Number(id); 

    const comodidadesId = await prisma.anuncioComodidades.findMany({
        where:{
            anuncio_id: anuncioId
        },
        select: {
            comodidade_id:true
        }
    })
    
    const comodidades = await prisma.comodidades.findMany({
        where: {
            
            id:{
                in: comodidadesId.map(c => c.comodidade_id)
            }
        }

    })

    const listaDTOs: getComodidadesAnuncioDto[] = comodidades.map(c =>({
        id: c.id,
        comodidades:c.comodidade,
        icone: c.icone
        
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
