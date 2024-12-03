import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { getReservaDto } from './database/dto/get-reserva.dto';
import { getAnuncioDto } from './database/dto/get-anuncio.dto';
import { getUsuarioDto } from './database/dto/get-anuncio-usuario.dto';
import { AnuncioFiltroRepository } from './repositories/anuncio.filtro.repository';
import { AnuncioMaisReservadosRepository } from './repositories/anuncio.mais_reservados.repository';
import { AnunciosRecomendadosRepository } from './repositories/anuncio.recomendados.repository';
import { getReservasById, getAnuncioById, getDadosUsuarioAnfitriaoPorIdAnuncio, getComodidadesByAnuncioId, getFotosByAnuncioId } from './repositories/anuncio.repositories';
import { getAnuncioFotosDto } from './database/dto/get-anuncio-fotos.dto';
import { getComodidadesAnuncioDto } from './database/dto/get-comodidade-anuncio.dto';
import { anunciosRecomendadosDTO } from './database/dto/get-anuncios-recomendados.dto';

@Injectable()
export class AnuncioService {
  private readonly prisma = new PrismaClient();

  constructor(
    private readonly anuncioFiltroRepository: AnuncioFiltroRepository,
    private readonly anuncioMaisReservadoRepository: AnuncioMaisReservadosRepository,
    private readonly anunciosRecomendadosRepository: AnunciosRecomendadosRepository,
  ) {}

  async getAnuncioById(id: number): Promise<getAnuncioDto | null> {
    return getAnuncioById(id);
  }

  async getReservas(id: number): Promise<getReservaDto[] | object> {
    if (!Number.isNaN(id) && id > 0) {
      const data = await getReservasById(id);

      // Verifica se 'data' é null, undefined ou uma lista vazia
      if (data == null || (Array.isArray(data) && data.length === 0)) {
        return {
          message: 'not content',
          status: 204,
        };
      } else {
        return data;
      }
    } else {
      return {
        message: 'bad request',
        status: 400,
      };
    }
  }

  async getUserFromAnuncio(id: number): Promise<getUsuarioDto | null> {
    try {
      const anuncio = await this.getAnuncioById(id);

      if (anuncio && anuncio.usuario_id) {
        const user = await this.prisma.usuario.findUnique({
          where: { id: anuncio.usuario_id },

          select: {
            id: true,
            token_acesso: true,
            email: true,
            nome: true,
            nome_completo: true,
            foto: true,
            criado_em: true,
          },
        });

        if (user) {
          const userSaved: getUsuarioDto = {
            id: user.id,
            nome: user.nome,
            foto: user.foto,
            tempoCadastro: new Date().getTime() - user.criado_em.getTime(),
          };
          return userSaved;
        }
      } else {
        throw new Error('Usuário não encontrado');
      }

      return null;
    } catch (error) {
      // Handle errors gracefully, e.g., log the error and return null
      console.error('Error fetching user:', error);
      return null;
    }
  }


  async getAnunciosService(
    destino: string | undefined,
    checkin: Date | undefined,
    checkout: Date | undefined,
    hospedes: number,
  ) {
    const anuncios = await this.anuncioFiltroRepository.searchAnuncios(
      destino,
      checkin,
      checkout,
      hospedes,
    );

    return anuncios;
  }

  async getAnunciosMaisReservados() {
    return this.anuncioMaisReservadoRepository.getAnuncios();
  }

  async getComodidadesByAnuncioId(id: number): Promise<getComodidadesAnuncioDto[] | null> {
    const comodidades = await getComodidadesByAnuncioId(id);
    return comodidades;
  }

  async getFotosByAnuncioId(id: number): Promise<getAnuncioFotosDto[] | null> {
    const listaFotos =  await getFotosByAnuncioId(id)
    return listaFotos;
  }

  async getAnunciosRecomendados(id: number): Promise<anunciosRecomendadosDTO[] | null> {
    return this.anunciosRecomendadosRepository.getAnuncios(id);
  }
}
