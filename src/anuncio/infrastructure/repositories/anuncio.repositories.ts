import { PrismaClient } from "@prisma/client";
import { getEnderecoDto } from "../database/dto/get-anuncio-endereco.dto";
import { getReservaDto } from "../database/dto/get-reserva.dto";
import { getAnuncioDto } from "../database/dto/get-anuncio.dto";
import { getUsuarioDto } from "../database/dto/get-anuncio-usuario.dto";
import { status_reserva } from "../../../shared/enums/statusReservaEnum"
import { share } from "rxjs";


const prisma = new PrismaClient();

export async function getAnuncioById(id: number): Promise<getAnuncioDto | null> {
    
    const anuncio = await prisma.anuncio.findUnique({
        where: { id: Number(id) },
        select: {
            id: true,
            titulo: true,
            anfitriao: true,
            
        },
    });

    const getAnuncio: getAnuncioDto = {
        id: anuncio?.id || null,
        titulo: anuncio?.titulo || null,
        usuario_id: anuncio?.anfitriao ? Number(anuncio.anfitriao) : null

    }

    return getAnuncio
}

export async function getReservasById(id: number): Promise<getReservaDto[] | null> {
    const status  = status_reserva.Processando;
    const reservas = await prisma.reserva.findMany({
        where: { 
            id_anuncio: id,
            status_reserva: status
        },
        select:{
            id: true,
            id_usuario: true,
            id_anuncio: true,
            status_reserva: true,
            data_inicial: true,
            data_final: true,
            criado_em: true
        }
    });

    return reservas.map(reserva => ({
        id: reserva.id,
        usuario_id: reserva.id_usuario ? String(reserva.id_usuario) : undefined,
        anuncio_id: reserva.id_anuncio ? String(reserva.id_anuncio) : undefined,
        status_reserva: reserva.status_reserva,
        data_inicial: reserva.data_inicial || null,
        data_final: reserva.data_final || null,
        criado_em: reserva.criado_em || null
    })) || null;
}


export async function getDadosUsuarioAnfitriaoPorIdAnuncio(id: number): Promise<getUsuarioDto | null> {
    const usuario = await prisma.usuario.findUnique({
        where: { id },
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
