import { Injectable } from '@nestjs/common';
import { AnuncioMaisReservadosRepositoryInterface } from 'src/anuncio/domain/repositories/anuncio.mais_reservados.repository';
import { PrismaClient } from '@prisma/client';
import { GetAnunciosMaisReservados } from '../database/dto/get-anuncio-mais-reservados.dto';

const prisma = new PrismaClient();
@Injectable()
export class AnuncioMaisReservadosRepository
  implements AnuncioMaisReservadosRepositoryInterface
{
  async getAnuncios(): Promise<any> {
    const anuncios = await prisma.anuncio.findMany({
      select: {
        id: true,
        fotos: true,
        titulo: true,
        avaliacao: true,
        valor_diaria: true,
        endereco: true,
        reserva: true,
      },
    });

    const anunciosList = anuncios.map((anuncio: GetAnunciosMaisReservados) => {
      return anuncio;
    });

    anuncios.map((anuncio) => {
      console.log(anuncio);
    });


  }
}
