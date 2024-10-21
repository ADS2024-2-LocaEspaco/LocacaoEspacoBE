export class CreateFeedbackDto {
    id:                         number;
    nota_limpeza:               string | null;
    nota_exatidao_anuncio:      string | null;
    nota_custo_beneficio:       string | null;
    nota_localizacao:           string | null;
    nota_seguiu_regras:         string | null;
    nota_pontualidade:          string | null;
    nota_cordialidade:          string | null;
    reservas_id:                number;
    comentario:                 string;
}
