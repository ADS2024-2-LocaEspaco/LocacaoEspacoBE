import { Injectable } from '@nestjs/common';
import { anuncio, /*Feedback,*/ PrismaClient, reservas, usuario } from '@prisma/client';
import { error } from 'console';
//import { getReservasById, getAnuncioById } from './repositories/anuncio.repositories';
import { getReservaDto } from './database/dto/get-reserva.dto';


@Injectable()
export class AnuncioService {

private readonly prisma = new PrismaClient();

  
  /*async getAnuncioById(id: string): Promise<Anuncio | null> {
    return getAnuncioById(id);
  }

  async getReservas(id: string): Promise<getReservaDto[] | object> {
    if(!Number.isNaN(parseInt(id)) && parseInt(id) > 0){
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

    }else{
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

}