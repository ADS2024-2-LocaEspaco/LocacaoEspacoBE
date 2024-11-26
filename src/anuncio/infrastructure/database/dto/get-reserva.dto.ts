class reservas {
    data_final: Date
    data_inicial: Date
}

class notas {
    nota_limpeza:           number
    nota_cordialidade:      number
    nota_custo_beneficio:   number
    nota_exatidao_anuncio:  number
    nota_localizacao:       number
    nota_pontualidade:      number
    nota_seguiu_regras:     number
}

export class getReservaDto {
    id:             String
    media_notas:    notas[]
    datas_reservas: reservas[]
    quant_hospedes: number
}
