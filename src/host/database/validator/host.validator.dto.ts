import { Min, Max, IsDate,IsIn, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class AnuncioValidator {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  id: number;
}







