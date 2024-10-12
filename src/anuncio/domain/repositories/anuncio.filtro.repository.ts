export interface AnuncioFiltroRepositoryInterface {
    searchAnuncios(destino: string, checkin: Date, checkout: Date, hospedes: number): Promise<any>;
}