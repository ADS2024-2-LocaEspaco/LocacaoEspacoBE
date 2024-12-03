import { Decimal } from "@prisma/client/runtime/library";

export class anunciosRecomendadosDTO {
    id: number;
    fotos: string[] | object;
    titulo: string | null;
    endereco: object;
    valor_diaria: number | Decimal;
    avalicacao: number[] | object;
    reserva: object[];
}