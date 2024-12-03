import { IsNotEmpty } from 'class-validator';

export class UploadImageDto {
  @IsNotEmpty()
  file: any;
}