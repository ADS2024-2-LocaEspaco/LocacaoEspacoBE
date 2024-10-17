import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class AnuncioValidator {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id: number;
}

export class ReservaValidator {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id_anuncio: number;
  
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id_usuario: number;

}

export class DadosDeAttStatus {

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  status: number;

}