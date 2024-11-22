import { anuncioFiltroCompletoDto } from "src/anuncio/infrastructure/database/dto/anuncio.filtro.completo";

export interface AnuncioFiltroCompletoRepository {
    //Find user by attribute
    getAdvancedSearch(filtroCompleto: anuncioFiltroCompletoDto): Promise<any>;
}