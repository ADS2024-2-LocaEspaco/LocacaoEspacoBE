import { usuario, avaliacao, reservas } from "@prisma/client";

export class GetComentariosDto{
    id:                     number;
    img?:                   string;
    nome:                   string;
    comentario:             string;
    nota_cordialidade?:     string; 
    nota_custo_beneficio?:  string;
    nota_exatidao_anuncio?: string;
    nota_limpeza?:          string;
    nota_localizacao?:      string;
    nota_pontualidade?:     string;
    nota_seguiu_regras?:    string;
}
