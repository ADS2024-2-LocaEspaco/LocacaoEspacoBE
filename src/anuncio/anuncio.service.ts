import { Injectable } from '@nestjs/common';
import { Anuncio, Feedback, PrismaClient, Reserva, User } from '@prisma/client';
import { FeedbackEntity } from 'src/feedback/domain/entities/feedback.entity';
import { getAnuncioById } from './infrastructure/database/model/anuncio';
import { error } from 'console';
import { getReservasById } from './infrastructure/database/model/anuncio';
@Injectable()
export class AnuncioService {

private readonly prisma = new PrismaClient();

  
  async getAnuncioById(id: string): Promise<Anuncio | null> {
    return getAnuncioById(id);
  }

  async getReservas(id: string): Promise<Reserva[] | null> {
    return await getReservasById(id);
  }


  async getUserFromAnuncio(id: string): Promise<User | null> {
    try {
      const anuncio = await this.getAnuncioById(id);
  
      if (anuncio && anuncio.userId) {
        return this.prisma.user.findUnique({
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
  }

}


