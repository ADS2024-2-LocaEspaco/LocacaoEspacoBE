import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class HostQueryDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id: number;
}
