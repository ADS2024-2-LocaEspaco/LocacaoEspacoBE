import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.instace';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';



@Injectable()
export class Outros {
  constructor(private readonly prisma:PrismaService){}

  async getDadosDeUsuario(id: number){

    try {
        const user = await this.prisma.usuario.findUnique({
          where:{ id }
        })

        return user;

    } catch (err) {
      
      if(err.code === 'P2025'){

        console.log('ID de usuário não encontrado', err.code, err.meta)

        throw new NotFoundException('Usuário não encontrado.');

      }else if( err instanceof PrismaClientKnownRequestError){

        console.log('Erro no prisma: ', err.code, err.meta)

        throw new BadRequestException('Um erro ocorreu na comunicação com o servidor.')
      }

      console.log('um erro não tratado ocorreu: ', err)

      throw new BadRequestException('Um erro desconhecido ocorreu.')
    }
  }

  async getDadosAnuncio(id: number){
    try {

      const anuncio = await this.prisma.anuncio.findUnique({
          where:{ id }
      })

      return anuncio;

    } catch (err) {
      
      if(err === 'P2025'){
        
        console.log('ID de anuncio não encontrado.', err.code, err.meta)

        throw new NotFoundException('Anuncio não encontrado! ');
      
      }else if(err instanceof PrismaClientKnownRequestError){
        
        console.log('Um erro ocorreu no prisma', err.code, err.meta)

        throw new BadRequestException('Ocorreu um erro ao comunicar-se com o servidor.')
      }

      console.log('Erro interno não tratado.', err)

      throw new BadRequestException('Um erro desconhecido ocorreu.')
    }
  }

}

