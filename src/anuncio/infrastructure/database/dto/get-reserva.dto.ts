export class getReservaDto {
  id: string;
  userId?: string;
  anuncioId?: string;
  status: number;
  data_entrada: Date;
  data_saida: Date;
  createdAt?: Date;
}
