// src/user/domain/repositories
import { CreateFeedbackDto } from "../../database/dto/create-feedback.dto";

export interface feedbackRepository {
    //Find user by attribute
    getComentariosAnuncio(anuncioId: number): Promise<CreateFeedbackDto[] | string>;
}