import { Injectable } from '@nestjs/common';
import { Feedback } from '@prisma/client';
import { getComentariosAnuncio } from '../../infrastructure/database/model/Feedback';
import { CreateFeedbackDto } from 'src/feedback/infrastructure/dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  
  async getComentarios(id: string): Promise<CreateFeedbackDto[] | any> {
    try {
      return getComentariosAnuncio(id);
      
    } catch (error) {
      return {"message": error};
    }
  }
}


