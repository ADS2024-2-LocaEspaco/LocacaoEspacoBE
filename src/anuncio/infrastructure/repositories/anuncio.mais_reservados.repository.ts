import { Injectable } from '@nestjs/common';
import { AnuncioMaisReservadosRepositoryInterface } from 'src/anuncio/domain/repositories/anuncio.mais_reservados.repository';
import { PrismaClient } from '@prisma/client';
import { GetAnunciosMaisReservadosDTO } from '../database/dto/get-anuncio-mais-reservados.dto';

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

    const anunciosList = anuncios.map((anuncio) => {
      return anuncio;
    });

    const anuncioListDto = [];

    for(let i = 0; i < anunciosList.length; i++) {
      const anuncio: GetAnunciosMaisReservadosDTO = {
        id: anunciosList[i].id,
        fotos: anunciosList[i].fotos,
        titulo: anunciosList[i].titulo,
        endereco: anunciosList[i].endereco,
        valor_diaria: anunciosList[i].valor_diaria,
        avalicacao: anunciosList[i].avaliacao,
        reserva: anunciosList[i].reserva,
        qtd_reserva: anunciosList[i].reserva.length,
      }

      anuncioListDto.push(anuncio);
    }

    return anuncioListDto.sort((a, b ) => b.qtd_reserva - a.qtd_reserva);
  }
}
