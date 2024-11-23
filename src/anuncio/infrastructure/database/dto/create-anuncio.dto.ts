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
  comodidades: number[]; // Check

  @IsArray()
  @IsInt({ each: true })
  seguranca: number[]; // Check

  @IsArray()
  fotos: string[]; // Check

  @IsBoolean()
  cameras: boolean; 

  @IsString()
  tipo_reserva_atual: string;

  @IsInt()
  tipo_hospede_id: number;

  @IsInt()
  valor_diaria: number;

  @IsInt()
  dias_minimo_antecedencia: number;

  @IsInt()
  dias_minimo_duracao: number;

  @IsInt()
  dias_maximo_duracao: number;

  // TODO: Criar a validação para o endereço
}
