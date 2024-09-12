import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePropertyDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
}