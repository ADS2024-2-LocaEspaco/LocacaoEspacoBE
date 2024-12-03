import { anunciosRecomendadosDTO } from "src/anuncio/infrastructure/database/dto/get-anuncios-recomendados.dto";

export interface AnunciosRecomendadosRepositoryInterface {
    getAnuncios(idUser: number): Promise<anunciosRecomendadosDTO[] | null>
}