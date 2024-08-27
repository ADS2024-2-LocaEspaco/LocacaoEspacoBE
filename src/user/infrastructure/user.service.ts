import { Injectable } from '@nestjs/common';
import { Feedback } from '@prisma/client';
import { FeedbackEntity } from 'src/feedback/domain/entities/feedback.entity';
import { getComentariosAnuncio } from 'src/feedback/infrastructure/database/model/Feedback';

@Injectable()
export class UserService {
  
  async getComentarioUser(id: string): Promise<Feedback[]> {
    return getComentariosAnuncio(id);
  }
}


