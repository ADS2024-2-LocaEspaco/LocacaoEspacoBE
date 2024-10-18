import { Injectable } from '@nestjs/common';
import { anuncio, avaliacao, PrismaClient, reservas, usuario } from '@prisma/client';
import { error } from 'console';
import { getReservasById, getAnuncioById, getUsuarioByUsuarioId } from './repositories/anuncio.repositories';
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
    if(!Number.isNaN(id) && id > 0){
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


  async getUserFromAnuncio(id: number): Promise<getUsuarioDto | null> {
    try {
        const anuncio = await this.getAnuncioById(id);
  
        if (anuncio && anuncio.usuario_id) {
            // Agora chamamos o método correto para buscar o usuário pelo usuario_id
            const userId = anuncio.usuario_id.toString();
            const usuario = await getUsuarioByUsuarioId(userId);
            return usuario; // Retorna o usuário encontrado
        } else {
            throw new Error('Anúncio ou usuário não encontrado');
        }
    } catch (error) {
        console.error('Error fetching user from anuncio:', error);
        return null; // Retorna null em caso de erro
    }
}

}


