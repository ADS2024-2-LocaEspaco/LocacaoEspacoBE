import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AnuncioFiltroRepositoryInterface } from 'src/anuncio/domain/repositories/anuncio.filtro.repository';

const prisma = new PrismaClient();

@Injectable()
export class AnuncioFiltroRepository
  implements AnuncioFiltroRepositoryInterface
{
  async searchAnuncios(
    destino: string | undefined,
    checkin: Date | undefined,
    checkout: Date | undefined,
    hospedes: number,
  ): Promise<any> {
    const anuncios = await prisma.anuncio.findMany({
      where: {
        OR: [
          { data_checkin: checkin },
          { data_checkout: checkout },
          { hospedes: hospedes },
          ...(destino ? [{ endereco: { some: { cidade: destino } } }] : []),
        ].filter(Boolean),
      },

      select: {
        id: true,
        titulo: true,
        endereco: {
          select: {
            cidade: true,
          },
        },
      },
    });

    return anuncios;
  }
}
