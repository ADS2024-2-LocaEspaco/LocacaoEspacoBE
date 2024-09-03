import { Injectable } from '@nestjs/common';
import { Anuncio, Feedback, PrismaClient, User } from '@prisma/client';
import { FeedbackEntity } from 'src/feedback/domain/entities/feedback.entity';
import { getAnuncioById } from './infrastructure/database/model/anuncio';
@Injectable()
export class AnuncioService {

private readonly prisma = new PrismaClient();

  
  async getAnuncioById(id: string): Promise<Anuncio | null> {
    return getAnuncioById(id);
  }


  async getUserFromAnuncio(id: string): Promise<User | null> {
    const anuncio = await this.getAnuncioById(id);
    if (anuncio) {
      return this.prisma.user.findUnique({
        where: { id: anuncio.userId },
      });
    }
    return null;
  }

}


