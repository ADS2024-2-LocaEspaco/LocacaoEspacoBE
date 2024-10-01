import { Injectable } from '@nestjs/common';
import { avaliacao } from '@prisma/client';
import { getComentariosAnuncio } from './repositories/avaliacao.repositories';
import { GetComentariosDto } from "./database/dto/get-comentarios.dto";

@Injectable()
export class AvaliacaoService {
  
  async getComentarios(id: string): Promise<GetComentariosDto[] | any> {
    try {
      return getComentariosAnuncio(+id);
      
    } catch (error) {
      return {"message": error};
    }
  }

}


