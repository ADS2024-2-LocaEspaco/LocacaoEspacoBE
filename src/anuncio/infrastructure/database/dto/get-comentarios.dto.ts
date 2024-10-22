import { usuario, avaliacao, reservas, anuncio } from "@prisma/client";

export class GetComentariosDto{
    id:                     number;
    img?:                   string | null;
    nome:                   string;
    nomecompleto:           string;
    comentario:             string;
    nota_cordialidade?:     number; 
    nota_custo_beneficio?:  number;
    nota_exatidao_anuncio?: number;
    nota_limpeza?:          number;
    nota_localizacao?:      number;
    nota_pontualidade?:     number;
    nota_seguiu_regras?:    number;
}
