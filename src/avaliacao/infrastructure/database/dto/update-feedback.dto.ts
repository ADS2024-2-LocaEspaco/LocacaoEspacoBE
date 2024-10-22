import { PartialType } from '@nestjs/mapped-types';
import { GetComentariosDto } from '../../../../anuncio/infrastructure/database/dto/get-comentarios.dto';

export class UpdateuserDto extends PartialType(GetComentariosDto) {}
