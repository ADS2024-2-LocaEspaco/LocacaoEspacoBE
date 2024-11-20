import {
  IsString,
  IsInt,
  MinLength,
  IsBoolean,
  IsDate,
  IsArray,
  MaxLength,
} from 'class-validator';

export class CreateAnuncioDto {
  @IsString()
  @MaxLength(40)
  titulo: string;

  @IsString()
  @MinLength(20)
  @MaxLength(500)
  descricao: string;

  @IsInt()
  tipo_imovel_id: number;

  @IsInt()
  tipo_espaco_id: number;

  @IsInt()
  quartos: number;

  @IsInt()
  camas: number;

  @IsInt()
  banheiros: number;

  @IsInt()
  hospedes: number;

  @IsArray()
  @IsInt({ each: true })
  comodidades: number[]; // Check database

  @IsArray()
  @IsInt({ each: true })
  seguranca: number[]; // Check database

  @IsArray()
  fotos: string[]; // Check

  @IsBoolean()
  cameras: boolean;

  // Check "Tipo reserva"

  @IsInt()
  tipo_hospede_id: number;

  @IsInt()
  valor_diaria: number;

  // Check dias_minimo
}
