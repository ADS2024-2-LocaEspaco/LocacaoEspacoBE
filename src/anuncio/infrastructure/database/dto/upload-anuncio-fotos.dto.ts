import { IsInt } from 'class-validator';

export class UploadAnuncioFotosDto {
  @IsInt()
  anuncioId: number;
}
