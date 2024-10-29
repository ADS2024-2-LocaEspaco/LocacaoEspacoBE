import { Decimal } from "@prisma/client/runtime/library";

export class CreateFeedbackDto {
    id:                         number;
    nota_limpeza:               Decimal | null;
    nota_exatidao_anuncio:      Decimal | null;
    nota_custo_beneficio:       Decimal | null;
    nota_localizacao:           Decimal | null;
    nota_seguiu_regras:         Decimal | null;
    nota_pontualidade:          Decimal | null;
    nota_cordialidade:          Decimal | null;
    reservas_id:                number | null;
    comentario:                 string;
}
