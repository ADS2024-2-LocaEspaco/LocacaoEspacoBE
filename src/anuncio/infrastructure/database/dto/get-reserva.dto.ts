import { reserva } from "@prisma/client";

export class getReservaDto {
    id: number | null
    id_usuario: number | null
    id_anuncio: number | null
    status_reserva: string | null
    data_inicial: Date | null
    data_final: Date | null
    criado_em: Date | null
}