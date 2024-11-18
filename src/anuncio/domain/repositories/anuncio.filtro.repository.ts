export interface AnuncioFiltroRepositoryInterface {
  searchAnuncios(
    destino: string,
    checkin: Date | undefined,
    checkout: Date | undefined,
    hospedes: number,
  ): Promise<any>;
}
