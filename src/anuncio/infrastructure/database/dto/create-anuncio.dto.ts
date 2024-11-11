export class createAnuncioDto {
  readonly titulo: string;
  readonly tipo_imovel_id: number;
  readonly tipo_espaco_id: number;
  readonly comodidade_id: number;
  readonly seguranca_id: number;
  readonly tipo_hospede_id: number;
  readonly foto_id: number;
  readonly hospedes: number;
  readonly quartos: number;
  readonly banheiros: number;
  readonly descricao?: string;
  readonly valor_diaria: number;
  readonly publicado: boolean;
  readonly data_checkin: Date;
  readonly data_checkout: Date;
  readonly cameras: boolean;
  readonly regra_da_casa: string;
  readonly politica_cancelamento: string;
  readonly anfitriao: number;
}
