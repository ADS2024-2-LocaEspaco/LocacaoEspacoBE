import { Controller, Get, Query, Req, Res } from "@nestjs/common";
import { AnuncioService } from "src/anuncio/infrastructure/anuncio.service";
import { Request, Response } from "express";

@Controller('home')
export class AnuncioFiltroController {
    constructor(private readonly anuncioService: AnuncioService) {}

    @Get('search')
    async getAnuncios(@Req() req: Request, @Res() res: Response) {
        const { destino, checkin, checkout, hospedes } = req.query;

        let checkinDate, checkoutDate: Date | null;

        checkinDate = !checkin ? null : new Date(<string>checkin);

        checkoutDate = !checkout ? null : new Date(<string>checkout);

        await this.anuncioService.getAnunciosService(<string> destino, checkinDate, checkoutDate, parseInt(<string>hospedes));

        return res.status(200).send('funcionou');
    }
}