import { Controller, Get } from "@nestjs/common";
import { AnuncioService } from "src/anuncio/infrastructure/anuncio.service";
import { Request, Response } from "express";

@Controller('home')
export class AnuncioFiltroController {
    constructor(private readonly anuncioService: AnuncioService) {}

    @Get('search')
    getAnuncios(req: Request, res: Response) {
        let x = "oi"
        return x;
        
        //return this.anuncioService.getAnunciosService()
    }
}