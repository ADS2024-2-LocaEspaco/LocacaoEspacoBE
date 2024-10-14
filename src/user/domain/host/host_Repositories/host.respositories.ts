export interface AnuncioPartial {
  id: number;
  usuario_id: string;
  tipo_espaco_id: number;
  tipo_imoveis_id: number;
  titulo: string;
  descricao: string;
  url_imgs: string;
  polit_cancelamento: bigint;
}

export interface Anuncio_qtds_suportadas {
  quant_quartos: bigint;
  quant_banheiro: bigint;
  quant_cama: bigint;
  quant_hospede: bigint;
}
export interface Anuncio_Permissoes {
  aceita_crianca: boolean | null;
  aceita_bebe: boolean | null;
  aceita_pet: boolean | null;
  quant_pet: bigint | null;
  permite_eventos: boolean | null;
  permite_fumar: boolean | null;
}

export interface Anuncio_checkInOut {
  checkin_inicio: Date;
  checkin_fim: Date | null;
  checkout: Date;
}

export interface Anuncio_valores {
  valor_diaria: string;
  quant_diaria_min: bigint | null;
  quant_diaria_max: bigint | null;
}

export interface Anuncio_Atributos_Não_Obrigatorios {
  cftv: boolean | null;
  monitoramento_ruido: boolean | null;
  armas: boolean | null;
  aprovacao_reserva: boolean | null;
  horario_silencio: boolean | null;
  horario_silencio_inicio: Date | null;
  horario_silencio_fim: Date | null;
  fotografia_comercial: boolean | null;
  regras_adicionais: string | null;
  criado_em: Date;
  publicado: boolean | null;
  temp_antec_reserva: bigint | null;
}
export interface hostRepositories {
  getAnuncioLocations(id: number): Promise<AnuncioPartial[]>;

  getAnuncioQtdSuportada(id: number): Promise<Anuncio_qtds_suportadas[]>;

  getAnuncioPermissoes(id: number): Promise<Anuncio_Permissoes[]>;

  getAnuncioChecks(id: number): Promise<Anuncio_checkInOut[]>;

  getAnuncioValores(id: number): Promise<Anuncio_valores[]>;

  getAnuncioAtrNaObrigatorios(
    id: number,
  ): Promise<Anuncio_Atributos_Não_Obrigatorios[]>;
}
