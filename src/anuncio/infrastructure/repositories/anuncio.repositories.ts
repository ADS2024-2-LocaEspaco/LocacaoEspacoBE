import { PrismaClient } from "@prisma/client";
import { getEnderecoDto } from "../database/dto/get-anuncio-endereco.dto";
import { getReservaDto } from "../database/dto/get-reserva.dto";
import { getAnuncioDto } from "../database/dto/get-anuncio.dto";
import { getUsuarioDto } from "../database/dto/get-anuncio-usuario.dto";

const prisma = new PrismaClient();

export async function getAnuncioById(id: number): Promise<getAnuncioDto | null> {
    
    const anuncio = await prisma.anuncio.findUnique({
        where: { id: Number(id) },
        select: {
            id: true,
            titulo: true,
            usuario_id: true
        },
    });

    const getAnuncio: getAnuncioDto = {
        id: anuncio?.id || null,
        titulo: anuncio?.titulo || null,
        usuario_id: anuncio?.usuario_id ? Number(anuncio.usuario_id) : null

    }

    return getAnuncio
}

export async function getReservasById(id: number): Promise<getReservaDto[] | null> {
    const reservas = await prisma.reservas.findMany({
        where: { 
            anuncio_id: id,
            status_reserva: 1
        },
        select:{
            id: true,
            status_reserva: true,
            data_inicial: true,
            data_final: true,
            criado_em: true
        }
    });

    return reservas;
}
export async function getDadosUsuarioAnfitriaoPorIdAnuncio(id: number): Promise<getUsuarioDto | null> {
    const usuario = await prisma.usuario.findUnique({
        where: { id },
        select: {
            id: true,
            nome: true,
            img: true,
            criado_em: true
        },
    });

    // Verifica se o usuário foi encontrado
    if (!usuario) {
        return null;
    }

    const tempoCadastro = calcularTempoCadastro(usuario.criado_em); // Call the function directly

    const anfitriao: getUsuarioDto = {
        id: Number(usuario.id),
        nome: usuario.nome,
        foto: usuario.img,
        tempoCadastro: tempoCadastro
    }

    return anfitriao;
}


function calcularTempoCadastro(criadoEm: Date ): string {
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
