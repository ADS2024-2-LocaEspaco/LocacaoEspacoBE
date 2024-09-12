import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly propertyType: string;

  @IsString()
  @IsNotEmpty()
  readonly spaceType: string;

  @IsNumber()
  @IsNotEmpty()
  readonly rooms: number;

  @IsNumber()
  @IsNotEmpty()
  readonly bathrooms: number;

  @IsNumber()
  @IsNotEmpty()
  readonly beds: number;

  @IsNumber()
  @IsNotEmpty()
  readonly guests: number;
}