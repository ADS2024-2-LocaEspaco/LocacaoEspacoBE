import { Injectable } from '@nestjs/common';
//import { Feedback } from '@prisma/client';
//import { getComentariosAnuncio } from './repositories/Feedback.repositories';
import { CreateFeedbackDto } from "./database/dto/create-feedback.dto";

@Injectable()
export class FeedbackService {
  
  /*async getComentarios(id: string): Promise<CreateFeedbackDto[] | any> {
    try {
      return getComentariosAnuncio(id);
      
    } catch (error) {
      return {"message": error};
    }
  }*/
}


