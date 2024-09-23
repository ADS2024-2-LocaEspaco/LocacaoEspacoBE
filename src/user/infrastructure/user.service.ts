import { Injectable } from '@nestjs/common';
import { Feedback, PrismaClient, User } from '@prisma/client';
import { getComentariosAnuncio } from '../../feedback/infrastructure/repositories/Feedback.repositories';
import { getUserHost } from './database/model/User';
import { createHostDto } from './dto/create-user-host.dto';
import { CreateFeedbackDto } from 'src/feedback/infrastructure/database/dto/create-feedback.dto';
import { UserSaveRepository } from './repositories/user.save.repository';
import { userAuthProperty } from './database/dto/user.auth.property.dto';


@Injectable()
export class UserService {
  constructor(
    private readonly userSaveRepository: UserSaveRepository,
    private readonly prisma = new PrismaClient(),
  ) {}

  
  async getComentarioUser(id: string): Promise<CreateFeedbackDto[]> {
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

  async googleLogin(req: any) {
    if (!req.user) {
      return 'Nenhum usuário';
    }
    
    const user: userAuthProperty = {
      accessToken: req.user.accessToken,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      picture: req.user.picture,
    };
    
    try {
      if (!(await this.userSaveRepository.userExists(user.email))) {
        await this.userSaveRepository.save(user);
      
      }else {
        await this.userSaveRepository.updateToken(user);
      }

      return {
        message: 'Usuário logado',
        user: user,
      };
    }catch(error) {
      return {
        message: error
      }
    }
    
  }

}
