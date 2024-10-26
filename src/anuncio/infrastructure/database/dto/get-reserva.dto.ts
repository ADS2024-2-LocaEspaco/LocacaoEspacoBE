import { status_reserva } from "@prisma/client"; 

export class getReservaDto {
    id: number;
    usuario_id?: string;
    anuncio_id?: string;
    status_reserva: status_reserva | null; 
    data_inicial: Date | null; 
    data_final: Date | null; 
    criado_em?: Date | null; 
}
