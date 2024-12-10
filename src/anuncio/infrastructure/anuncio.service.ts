import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  CreateAnuncioDto,
  UpdateAnuncioDto,
} from './database/dto/create-anuncio.dto';
import { EnderecoDto } from './database/dto/endereco.dto';
import { error } from 'console';
import {
  getReservasById,
  getAnuncioById,
  getDadosUsuarioAnfitriaoPorIdAnuncio,
  getComodidadesByAnuncioId,
  getFotosByAnuncioId,
  getTipoImovel,
  getTipoEspaco,
  getComodidades,
  getSeguranca,
  getTipoHospede,
} from './repositories/anuncio.repositories';
import { getReservaDto } from './database/dto/get-reserva.dto';
import { getAnuncioDto } from './database/dto/get-anuncio.dto';
import { getUsuarioDto } from './database/dto/get-anuncio-usuario.dto';
import { getAnuncioFotosDto } from './database/dto/get-anuncio-fotos.dto';
import { getComodidadesAnuncioDto } from './database/dto/get-comodidade-anuncio.dto';

@Injectable()
export class AnuncioService {
  private readonly prisma = new PrismaClient();

  async getAnuncioById(id: number): Promise<getAnuncioDto | null> {
    return getAnuncioById(id);
  }

  async getReservas(id: number): Promise<getReservaDto[] | object> {
    if (!Number.isNaN(id) && id > 0) {
      let data = await getReservasById(id);

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
  async saveFotos(anuncioId: number, files: Express.Multer.File[]) {
    // Verificar se o anúncio existe
    const anuncio = await this.prisma.anuncio.findUnique({
      where: { id: anuncioId },
    });

    if (!anuncio) {
      throw new NotFoundException(
        `Anúncio com ID ${anuncioId} não encontrado.`,
      );
    }

    // Salvar as fotos e relacioná-las ao anúncio
    const fotosData = files.map((file) => ({
      url: file.filename,
    }));

    const fotos = await this.prisma.fotos.createMany({
      data: fotosData,
      skipDuplicates: true,
    });

    const fotoIds = await this.prisma.fotos.findMany({
      where: { url: { in: fotosData.map((f) => f.url) } },
    });

    await this.prisma.anuncioFotos.createMany({
      data: fotoIds.map((foto) => ({
        anuncio_id: anuncioId,
        foto_id: foto.id,
      })),
    });

    return fotos;
  }

  async getUserFromAnuncio(id: number): Promise<getUsuarioDto | null> {
    const anuncio = await this.getAnuncioById(id);
    const usuario = await getDadosUsuarioAnfitriaoPorIdAnuncio(id);
    return usuario;
  }

  async createAnuncio(data: CreateAnuncioDto): Promise<Object> {
    const { comodidades, endereco, ...values } = data;

    const anuncio = await this.prisma.anuncio.create({
      data: {
        ...values,
        publicado: false,
        tipo_reserva_atual: 'Instant_nea',
        anfitriao: 1,
        anuncioComodidades: {
          create: comodidades.map((comodidade) => {
            return {
              comodidade_id: comodidade,
            };
          }),
        },
        endereco: {
          create: endereco,
        },
      },
    });

    return anuncio;
  }

  async updateAnuncio(
    id: number,
    data: Partial<UpdateAnuncioDto>,
  ): Promise<Object> {
    try {
      const { comodidades, endereco, ...values } = data;

      const anuncioAtualizado = await this.prisma.anuncio.update({
        where: { id },
        data: {
          // ...
          anuncioComodidades: comodidades
            ? {
                deleteMany: {},
                create: comodidades.map((comodidade) => ({
                  comodidade_id: comodidade,
                })),
              }
            : undefined,
        },
      });

      return anuncioAtualizado;
    } catch (error) {
      console.error(error);
      return {
        message: 'Erro ao atualizar o anúncio',
        status: 500,
      };
    }
  }

  async createEndereco(
    enderecoData: EnderecoDto,
    anuncioId: number,
  ): Promise<void> {
    await this.prisma.endereco.create({
      data: {
        cep: enderecoData.cep,
        estado: enderecoData.estado,
        cidade: enderecoData.cidade,
        bairro: enderecoData.bairro,
        rua: enderecoData.rua,
        numero: enderecoData.numero,
        complemento: enderecoData.complemento,
        latitude: enderecoData.latitude,
        longitude: enderecoData.longitude,
        id_anuncio: anuncioId,
      },
    });
  }

  async getTipoImovel(): Promise<Object> {
    return getTipoImovel();
  }

  async getTipoEspaco(): Promise<Object> {
    return getTipoEspaco();
  }

  async getComodidades(
    especial: boolean | undefined = undefined,
  ): Promise<Object> {
    return getComodidades(especial);
  }

  async getSeguranca(): Promise<Object> {
    return getSeguranca();
  }

  async getTipoHospede(): Promise<Object> {
    return getTipoHospede();
  }

  async getComodidadesByAnuncioId(
    id: number,
  ): Promise<getComodidadesAnuncioDto[] | null> {
    const comodidades = await getComodidadesByAnuncioId(id);
    return comodidades;
  }

  async getFotosByAnuncioId(id: number): Promise<getAnuncioFotosDto[] | null> {
    const listaFotos = await getFotosByAnuncioId(id);
    return listaFotos;
  }
}
