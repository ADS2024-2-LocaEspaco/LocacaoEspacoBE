import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePropertyDto {
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