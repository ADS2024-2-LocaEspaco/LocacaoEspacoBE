import { Injectable } from '@nestjs/common';
import { Feedback, PrismaClient, User } from '@prisma/client';
import { FeedbackEntity } from 'src/feedback/domain/entities/feedback.entity';
import { getComentariosAnuncio } from 'src/feedback/infrastructure/database/model/Feedback';
import { getUserHost } from './database/model/User';
import { createHostDto } from './dto/create-user-host.dto';

@Injectable()
export class UserService {
  private readonly prisma = new PrismaClient();

  
  async getComentarioUser(id: string): Promise<Feedback[]> {
    return getComentariosAnuncio(id);
  }

  async getDataAnfitriao(id: string): Promise<createHostDto | null> {
    let data: createHostDto | any 

    try {
      data = await getUserHost(id)

      if(data == null){
        data = {
          "message": "usuario não encontrado"
        }

      }

    } catch (error) {
      data = {
        "erro": `${error}`
      }
    }

    return data
  }

  async getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

}