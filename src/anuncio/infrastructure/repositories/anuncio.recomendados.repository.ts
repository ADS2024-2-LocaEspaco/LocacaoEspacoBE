import { Injectable } from '@nestjs/common';
import { anunciosRecomendadosDTO } from '../database/dto/get-anuncios-recomendados.dto';
import { AnunciosRecomendadosRepositoryInterface } from 'src/anuncio/domain/repositories/anuncio.recomendados.repository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AnunciosRecomendadosRepository
  implements AnunciosRecomendadosRepositoryInterface
{
  async getAnuncios(idUser: number): Promise<anunciosRecomendadosDTO[] | null> {
    const anunciosUser = await prisma.anuncio.findMany({
      where: {
        reserva: {
          some: {
            id_usuario: idUser,
          },
        },
      },
      include: {
        reserva: true,
        endereco: true,
        tipo_espaco: true,
        tipo_imovel: true,
        anuncioFotos: true,
        avaliacao: true,
      },
    });

    const allAnuncios = await prisma.anuncio.findMany({
      select: {
        id: true,
        endereco: true,
        tipo_imovel: true,
        tipo_espaco: true,
      },
    });
    const anunciosRecomendados: anunciosRecomendadosDTO[] = [];

    allAnuncios.map((anuncio) => {
      anunciosUser.map((anuncioUser) => {
        if (
          anuncio.id !== anuncioUser.id &&
          (anuncio.endereco[0].cidade === anuncioUser.endereco[0].cidade ||
            anuncio.tipo_imovel === anuncioUser.tipo_imovel ||
            anuncio.endereco[0].cidade === anuncioUser.endereco[0].cidade)
        ) {
          anunciosRecomendados.push({
            id: anuncioUser.id,
            fotos: anuncioUser.anuncioFotos,
            titulo: anuncioUser.titulo,
            endereco: anuncioUser.endereco,
            valor_diaria: anuncioUser.valor_diaria,
            avalicacao: anuncioUser.avaliacao,
            reserva: anuncioUser.reserva,
            tipo_imovel: anuncioUser.tipo_imovel.id,
            tipo_espaco: anuncioUser.tipo_espaco.id,
          });
        }
      });
    });

    return anunciosRecomendados;
  }
}
