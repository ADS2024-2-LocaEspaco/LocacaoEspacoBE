import { Min, Max, IsDate,IsIn, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class AnuncioValidator {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  id: number;
}

export class ReservaValidator {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  id_anuncio: number;
  
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  id_usuario: number;

}

export class DadosDeAttStatus {

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  id: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(3)
  @Type(() => Number)
  status: number;

}

export class HistoricoDados {

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(3)
  @Type(() => Number)
  status_reserva: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dataInicial: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dataFinal: Date;
}

export class DadosNegarAceitar {

  @IsNotEmpty()
  @IsInt()
  @IsIn([0, 1], { message: 'Impossivel valor diferentes de "aceitar" e "negar"'})
  @Type(() => Number)
  status_aceite: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  id_reserva: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  id_usuario: number;

}