import {
  IsString,
  IsInt,
  MinLength,
  IsBoolean,
  IsOptional,
  IsArray,
  IsNotEmpty,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class EnderecoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  cep: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  estado: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  cidade: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  bairro: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  rua: string;

  @IsString()
  @IsOptional()
  @MaxLength(4)
  numero?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  complemento?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  latitude?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  longitude?: string;
}

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
  comodidades: number[]; 

  @IsInt()
  seguranca_id: number;

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

  @ValidateNested()
  @Type(() => EnderecoDto)
  endereco: EnderecoDto;
}

export class UpdateAnuncioDto extends PartialType(CreateAnuncioDto) {}
