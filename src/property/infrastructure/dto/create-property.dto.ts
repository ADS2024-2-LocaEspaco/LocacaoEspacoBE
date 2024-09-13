import { IsString, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';
import { PropertyAmenitiesDto } from './property-amenities.dto';

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

  @ValidateNested()
  @Type(() => AddressDto)
  readonly address: AddressDto;

  @ValidateNested()
  @Type(() => PropertyAmenitiesDto)
  readonly propertyAmenities: PropertyAmenitiesDto;
}