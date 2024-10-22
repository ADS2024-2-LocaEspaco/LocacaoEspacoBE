import { IsString, IsNotEmpty, IsNumber } from 'class-validator';;

export default class CreateAnuncioDto {
  @IsString()
  @IsNotEmpty()
  readonly titulo: string;

  @IsString()
  @IsNotEmpty()
  readonly descricao: string; 

  @IsNumber()
  @IsNotEmpty()
  readonly quartos: number;

  @IsNumber()
  @IsNotEmpty()
  readonly camas: number; // todo: verificar se é necessário

  @IsNumber()
  @IsNotEmpty()
  readonly hospedes: number;
  
  

}