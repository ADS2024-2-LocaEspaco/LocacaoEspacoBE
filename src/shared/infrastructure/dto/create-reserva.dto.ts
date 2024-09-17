import { Reserva } from "@prisma/client";

export class CreateReservaDto {
    id:             String
    userId?:        String
    anuncioId?:     String
    status:         number
    data_entrada:   Date
    data_saida:     Date
    createdAt?:     Date 
}
