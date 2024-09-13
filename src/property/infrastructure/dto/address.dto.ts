import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsString()
  @IsNotEmpty()
  readonly number: string;

  @IsString()
  @IsNotEmpty()
  readonly district: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly state: string;

  @IsString()
  @IsNotEmpty()
  readonly zipCode: string;

  @IsString()
  @IsOptional()
  readonly complement?: string;
}