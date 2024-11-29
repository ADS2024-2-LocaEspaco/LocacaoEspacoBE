import { GetAnunciosMaisReservadosDTO } from "src/anuncio/infrastructure/database/dto/get-anuncio-mais-reservados.dto";

export interface AnuncioMaisReservadosRepositoryInterface {
    getAnuncios(id: number):Promise<GetAnunciosMaisReservadosDTO>
}