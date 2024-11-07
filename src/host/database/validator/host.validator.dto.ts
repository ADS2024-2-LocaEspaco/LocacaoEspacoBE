import { Contains, IsBoolean, IsDate, IsIn, isInt, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { StatusReserva } from 'src/shared/enum/enums';

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
  @IsIn([0, 1], { message: 'Status inválido!'})
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
  @IsIn([0, 1], { message: 'Status inválido!'})
  @Type(() => Number)
  status: number;

}

export class HistoricoDados {

  @IsNotEmpty()
  @IsInt()
  @IsIn([0, 1], { message: 'Status inválido!'})
  @Type(() => Number)
  status: number;

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
  status: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id_reserva: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id_usuario: number;

}