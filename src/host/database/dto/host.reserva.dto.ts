import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class ReservaDto{
@IsNotEmpty()
@IsInt()
@Type(() => Number)
id_anuncio: number;

@IsNotEmpty()
@IsInt()
@Type(() => Number)
id_usuario: number;
}