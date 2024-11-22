import { Body, Controller, Get} from "@nestjs/common";
import { AnuncioFiltroCompletoService } from "../services/anuncio.filtro.completo.service";

@Controller('filtroCompleto')
export class AnuncioFiltroCompleto {
    constructor(private readonly anuncioFiltroCompleto: AnuncioFiltroCompletoService) {}
 
    @Get()
    async getUserById(@Body() req: Request): Promise<any>  {
        return await this.anuncioFiltroCompleto.getAdvancedSearch(req);
    }
}