import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAnuncioDto } from './database/dto/create-anuncio.dto';
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

  async getUserFromAnuncio(id: number): Promise<getUsuarioDto | null> {
    const anuncio = await this.getAnuncioById(id);
    const usuario = await getDadosUsuarioAnfitriaoPorIdAnuncio(id);
    return usuario;
  }

  async createAnuncio(data: CreateAnuncioDto): Promise<Object> {
    try {
      const { endereco, fotos, comodidades, seguranca, ...values } = data;

      const anuncio = await this.prisma.anuncio.create({ 
        data: {
          ...values,
          publicado: false,
          tipo_reserva_atual: 'Instant_nea',
          anfitriao: 1,
        }
      });

      // await this.createEndereco(data.endereco, anuncio.id);

      return anuncio;
    } catch (error) {
      return {
        message: 'internal server error',
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

  async getComodidades(): Promise<Object> {
    return getComodidades();
  }

  async getSeguranca(): Promise<Object> {
    return getSeguranca();
  }

  async getComodidadesByAnuncioId(id: number): Promise<getComodidadesAnuncioDto[] | null> {
    const comodidades = await getComodidadesByAnuncioId(id);
    return comodidades;
  }

  async getFotosByAnuncioId(id: number): Promise<getAnuncioFotosDto[] | null> {
    const listaFotos =  await getFotosByAnuncioId(id)
    return listaFotos;
  }
}
