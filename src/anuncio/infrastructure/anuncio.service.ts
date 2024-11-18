import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { error } from 'console';
import { getReservasById, getAnuncioById, getDadosUsuarioAnfitriaoPorIdAnuncio } from './repositories/anuncio.repositories';
import { getReservaDto } from './database/dto/get-reserva.dto';
import { getAnuncioDto } from './database/dto/get-anuncio.dto';
import { getUsuarioDto } from './database/dto/get-anuncio-usuario.dto';


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


  async getUserFromAnuncio(id: string): Promise<User | null> {
    try {
      const anuncio = await this.getAnuncioById(id);
  
      if (anuncio && anuncio.userId) {
        return this.prisma.usuario.findUnique({
          where: { id: anuncio.userId },
        });
      } else {
        throw new Error('Usuário não encontrado');
      }
  
      return null;
    } catch (error) {
      // Handle errors gracefully, e.g., log the error and return null
      console.error('Error fetching user:', error);
      return null;
    }
  }*/

  async getAnunciosService(destino: String, checkin: Date, checkout: Date, hospedes: number) {
      console.log(destino)
      console.log(checkin)
      console.log(checkout)
      console.log(checkout)
      console.log(hospedes)
  }
}