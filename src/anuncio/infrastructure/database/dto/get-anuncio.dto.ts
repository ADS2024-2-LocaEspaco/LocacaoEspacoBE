import { anuncio } from "@prisma/client";
import { getUsuarioDto } from "./get-anuncio-usuario.dto";

export class getAnuncioDto {
    id: number
    titulo: String
    usuario_id?: String
}


