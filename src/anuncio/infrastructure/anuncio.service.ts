import { Injectable } from '@nestjs/common';
import { anuncio, avaliacao, PrismaClient, reserva, usuario } from '@prisma/client';
import { error } from 'console';
import { getMediaNotaAnuncio, getReservas, getQtdMaxHospede, getPoliticaCancelamento, getComentariosAnuncio, getAnuncio } from './repositories/anuncio.repositories';
import { getReservaDto } from './database/dto/get-reserva.dto';
import { GetComentariosDto } from 'src/anuncio/infrastructure/database/dto/get-comentarios.dto';


@Injectable()
export class AnuncioService {

private readonly prisma = new PrismaClient();

  
  async getAnuncio(id: string): Promise<anuncio | object> {
    if(!Number.isNaN(parseInt(id)) && parseInt(id) > 0){
      let result = await getAnuncio(+id)

      // Verifica se 'data' é null, undefined ou uma lista vazia
      if (result == null) {
        return {
          'message': 'not content',
          'status': 204
        }

      } else {
        return result;
      }

    }else{
      return {
        'message': 'bad request',
        'status': 400
      }
    }
  }

  async getQuantMaxEMinDiaria(id: string): Promise<object> {
    if(!Number.isNaN(parseInt(id)) && parseInt(id) > 0){
      let result = await getAnuncio(+id)

      // Verifica se 'data' é null, undefined ou uma lista vazia
      if (result == null) {
        return {
          'message': 'not content',
          'status': 204
        }

      } else {
        return {
          quant_diaria_min : result.qtd_diaria_min,
          quant_diaria_max : result.qtd_diaria_max,
        };
      }

    }else{
      return {
        'message': 'bad request',
        'status': 400
      }
    }
  }

  async getPoliticaCancelamento(id: string): Promise<object> {
    if(!Number.isNaN(parseInt(id)) && parseInt(id) > 0){
      let result = await getPoliticaCancelamento(+id)

      // Verifica se 'data' é null, undefined ou uma lista vazia
      if (Number.isNaN(result.politica_cancelamento)) {
        return {
          'message': 'not content',
          'status': 204
        }

      } else {
        return {
          politica_cancelamento : result.politica_cancelamento,
        };
      }

    }else{
      return {
        'message': 'bad request',
        'status': 400
      }
    }
  }

  async getComentarioUser(id: string): Promise<GetComentariosDto[] | object> {
    if(!Number.isNaN(parseInt(id)) && parseInt(id) > 0){
      let data = await getComentariosAnuncio(+id);

      // Verifica se 'data' é null, undefined ou uma lista vazia
      if (data == null || (Array.isArray(data) && data.length === 0)) {
        return {
          'message': 'not content',
          'status': 204
        }

      } else {
        return data;
      }

    }else{
      return {
        'message': 'bad request',
        'status': 400
      }
    }
  }

  async getAnuncioHospedeDataMediaAv(id: string): Promise<getReservaDto[] | object> {
    if(!Number.isNaN(parseInt(id)) && parseInt(id) > 0){
      let dataMediasNotas = await getMediaNotaAnuncio(+id);
      let dataReservas = await getReservas(+id);
      let dataMaxHospedes = await getQtdMaxHospede(+id);

      const verifyMedia       = (dataMediasNotas == null || (Array.isArray(dataMediasNotas) && dataMediasNotas.length === 0));
      const verifyReservas    = (dataReservas == null || (Array.isArray(dataReservas) && dataReservas.length === 0));
      const verifyMaxHospedes = (dataMaxHospedes == null);


      // Verifica se 'data' é null, undefined ou uma lista vazia
      if (verifyMaxHospedes || verifyMedia || verifyReservas) {
        return {
          'message': 'not content',
          'status': 204
        }

      } else {
        let dataFinal = {
          media_notas: dataMediasNotas._avg,
          datas_reservas: dataReservas,
          quant_hospedes: dataMaxHospedes,
        }
        return dataFinal;
      }

    }else{
      return {
        'message': 'bad request',
        'status': 400
      }
    }
    
  }


  // async getUserFromAnuncio(id: string): Promise<usuario | null> {
  //   try {
  //     const anuncio = await this.getAnuncioById(id);
  
  //     if (anuncio && anuncio.usuario_id) {
  //       return this.prisma.usuario.findUnique({
  //         where: { id: anuncio.usuario_id },
  //       });
  //     } else {
  //       throw new Error('Usuário não encontrado');
  //     }
  
  //     return null;
  //   } catch (error) {
  //     // Handle errors gracefully, e.g., log the error and return null
  //     console.error('Error fetching user:', error);
  //     return null;
  //   }
  // }

}