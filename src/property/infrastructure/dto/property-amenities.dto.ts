import { IsOptional, IsBoolean } from 'class-validator';

export class PropertyAmenitiesDto {
  @IsBoolean()
  @IsOptional()
  readonly hasWifi?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasTV?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasKitchen?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasWashingMachine?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasAirConditioning?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasParking?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasPaidParking?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasWorkstation?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasFan?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasPool?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasBarbecueGrill?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasBeachAccess?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasPoolTable?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasSmokeDetector?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasFireExtinguisher?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasFirstAidKit?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasCarbonAlarm?: boolean;
}