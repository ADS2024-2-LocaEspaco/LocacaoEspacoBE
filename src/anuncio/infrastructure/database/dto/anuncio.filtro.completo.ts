import { tipo_reserva } from "@prisma/client";

export class anuncioFiltroCompletoDto {
    tipo_imovel_id: number[]; 
    min_value: number; 
    max_value: number; 
    bath_quantity: number;
    room_quantity: number;
    comodidades: number[];
    reserva: tipo_reserva;
    accessibilities: number[];
}