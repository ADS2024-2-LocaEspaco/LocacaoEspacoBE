import { anuncio } from '@prisma/client';
import { getUsuarioDto } from './get-anuncio-usuario.dto';
export class getAnuncioDto {
  id: number | null;
  titulo: string | null;
  usuario_id?: number | null;
}
