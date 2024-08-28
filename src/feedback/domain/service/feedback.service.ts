import { Injectable } from '@nestjs/common';
import { Feedback } from '@prisma/client';
import { getComentariosAnuncio } from 'src/feedback/infrastructure/database/model/Feedback';

@Injectable()
export class FeedbackService {
  
  async getComentarios(id: string): Promise<Feedback[]> {
    return getComentariosAnuncio(id);
  }
}


