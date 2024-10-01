import { PartialType } from '@nestjs/mapped-types';
import { GetComentariosDto } from './get-comentarios.dto';

export class UpdateuserDto extends PartialType(GetComentariosDto) {}
