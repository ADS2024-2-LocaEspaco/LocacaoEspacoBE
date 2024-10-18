import { reservas } from "@prisma/client";

export class getReservaDto {
    id: number
    usuario_id?: String
    anuncio_id?: String
    status_reserva: bigint | null
    data_inicial: Date
    data_final: Date
    criado_em?: Date
}
