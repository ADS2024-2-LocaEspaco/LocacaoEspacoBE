import { Controller, Req, Res, Get } from "@nestjs/common";
import { Request, Response } from "express";
import { AnuncioService } from "src/anuncio/infrastructure/anuncio.service";

@Controller('home')
export class AnunciosRecomendadosController {
    constructor (private readonly anuncioService: AnuncioService) {}
    @Get('recomendados')
    async getAnunciosRecomendados (@Req() req: Request, @Res() res: Response) {
        const { id } = req.params;

        try {
            const anunciosRecomendados = await this.anuncioService.getAnunciosRecomendados(Number(id));

            return res.status(200).json(anunciosRecomendados);
        } catch (error) {
            return res.status(500).json({error: error, message: "Erro no servidor"});
        }

    }
}
