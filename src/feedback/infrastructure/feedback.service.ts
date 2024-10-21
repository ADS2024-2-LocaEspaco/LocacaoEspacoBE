import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from "./database/dto/create-feedback.dto";
import { feedbackRepository } from './repositories/Feedback.repositories';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly FeedbackRepository: feedbackRepository
  ){}
  
  async getComentarios(id: number): Promise<CreateFeedbackDto[] | string> {
    try {
      return this.FeedbackRepository.getComentariosAnuncio(id)
      
    } catch (error) {
      return "nenhum comentario encontrado"
    }
  }
}