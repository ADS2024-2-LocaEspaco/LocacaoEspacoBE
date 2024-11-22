import { Injectable } from "@nestjs/common";
import { error} from "console";
import { AnuncioFiltroCompletoRepository } from "src/anuncio/domain/repositories/anuncio.filtro.completo.repositories";
import { anuncioFiltroCompletoDto } from "src/anuncio/infrastructure/database/dto/anuncio.filtro.completo";
import { UserRepository } from "src/user/infrastructure/repositories/user.repositories";

@Injectable()
export class AnuncioFiltroCompletoService {
    constructor(private readonly AnuncioFiltroCompletoRepository: AnuncioFiltroCompletoRepository) { }

    async getAdvancedSearch(req: any): Promise<any> {
        if (!req) {
            throw error("Nenhuma requisição identificada")
        }

        const filtroCompleto: anuncioFiltroCompletoDto = {
            tipo_imovel_id: req.tipo_imovel_id,
            room_quantity: req.room_quantity,
            reserva: req.reserva,
            min_value: req.min_value,
            max_value: req.max_value,
            comodidades: req.comodidades,
            bath_quantity: req.bath_quantity,
            accessibilities: req.accessibilities
        }

        const resService = await this.AnuncioFiltroCompletoRepository.getAdvancedSearch(filtroCompleto)

        if (!resService) {
            throw error("Nenhuma informação retornada")
        }

        return resService
    }
}