import { Injectable } from "@nestjs/common";
import { AnuncioMaisReservadosRepositoryInterface } from "src/anuncio/domain/repositories/anuncio.mais_reservados.repository";
import { GetAnunciosMaisReservados } from "../database/dto/get-anuncio-mais-reservados.dto";
import { PrismaClient } from "@prisma/client";
import { log } from "console";

const prisma = new PrismaClient();
@Injectable()
export class AnuncioMaisReservadosRepository implements AnuncioMaisReservadosRepositoryInterface {
	async getAnuncios(): Promise<any> {
		const anuncios = await prisma.anuncio.findFirst({
			select: {
				reserva: true
			}
		});

		console.log(anuncios)
		
	}
}