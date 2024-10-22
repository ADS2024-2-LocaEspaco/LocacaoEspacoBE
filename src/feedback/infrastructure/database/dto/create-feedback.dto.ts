export class CreateFeedbackDto {
    id:                         number | null;;
    nota_limpeza:               number | null;
    nota_exatidao_anuncio:      number | null;
    nota_custo_beneficio:       number | null;
    nota_localizacao:           number | null;
    nota_seguiu_regras:         number | null;
    nota_pontualidade:          number | null;
    nota_cordialidade:          number | null;
    id_anuncio_avaliado:        number | null;;
    comentario:                 string | null;;
}
