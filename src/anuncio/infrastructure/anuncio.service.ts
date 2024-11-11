import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { getReservaDto } from './database/dto/get-reserva.dto';
import { getAnuncioDto } from './database/dto/get-anuncio.dto';
import { getUsuarioDto } from './database/dto/get-anuncio-usuario.dto';
import { createAnuncioDto } from './database/dto/create-anuncio.dto';
import { 
  getReservasById, 
  getAnuncioById, 
  getDadosUsuarioAnfitriaoPorIdAnuncio,
  getTipoImovel,
  getTipoEspaco,
  getComodidades,
  getSeguranca
} from './repositories/anuncio.repositories';

@Injectable()
export class AnuncioService {
  private readonly prisma = new PrismaClient();

  async getAnuncioById(id: number): Promise<getAnuncioDto | null> {
    return getAnuncioById(id);
  }

  async getReservas(id: number): Promise<getReservaDto[] | object> {
    if (!Number.isNaN(id) && (id) > 0) {
      let data = await getReservasById(id);

      // Verifica se 'data' é null, undefined ou uma lista vazia
      if (data == null || (Array.isArray(data) && data.length === 0)) {
        return {
          'message': 'not content',
          'status': 204
        }

      } else {
        return data;
      }

    } else {
      return {
        'message': 'bad request',
        'status': 400
      }
    }
  }

  async getUserFromAnuncio(id: number): Promise<getUsuarioDto | null> {
    const anuncio = await this.getAnuncioById(id);
    const usuario = await getDadosUsuarioAnfitriaoPorIdAnuncio(id);
    return usuario;
  }

  async createAnuncio(data: createAnuncioDto): Promise<void> {
    try {
      //
    } catch (error) {
      // 
    }
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
}