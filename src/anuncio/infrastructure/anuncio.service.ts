import { Injectable } from '@nestjs/common';
import { anuncio, avaliacao, PrismaClient, reserva, usuario } from '@prisma/client';
import { error } from 'console';
import { getReservaDto } from './database/dto/get-reserva.dto';
import { GetComentariosDto } from 'src/anuncio/infrastructure/database/dto/get-comentarios.dto';
import { getReservasById, getAnuncioById, getDadosUsuarioAnfitriaoPorIdAnuncio, getComodidadesByAnuncioId, getFotosByAnuncioId, getMediaNotaAnuncio, getPoliticaCancelamento, getAnuncio, getComentariosAnuncio, getQtdMaxHospede } from './repositories/anuncio.repositories';
import { getAnuncioDto } from './database/dto/get-anuncio.dto';
import { getUsuarioDto } from './database/dto/get-anuncio-usuario.dto';
import { getAnuncioFotosDto } from './database/dto/get-anuncio-fotos.dto';
import { getComodidadesAnuncioDto } from './database/dto/get-comodidade-anuncio.dto';


@Injectable()
export class AnuncioService {

  private readonly prisma = new PrismaClient();

  
  async getAnuncio(id: string): Promise<anuncio | object> {
    if(!Number.isNaN(parseInt(id)) && parseInt(id) > 0){
      let result = await getAnuncio(+id)

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

      if (result == null) {
        return {
          'message': 'not content',
          'status': 204
        }

      } else {
        return {
          dias_minimo_duracao : result.dias_minimo_duracao,
          dias_maximo_duracao : result.dias_maximo_duracao,
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

      if (result.politica_cancelamento == null) {
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

  async getComentarioUser(id: string): Promise<GetComentariosDto[] | any> {
    if(!Number.isNaN(parseInt(id)) && parseInt(id) > 0){
      let data = await getComentariosAnuncio(+id);

      if(data == null){
        return {
          'message': 'not content',
          'status': 204
        }

      }else{
        return data
      }

    }else{
      return {
        'message': 'bad request',
        'status': 400
      }
    }
  }

  async getAnuncioById(id: number): Promise<getAnuncioDto | null> {
    return getAnuncioById(id);
  }

  async getReservas(id: number): Promise<getReservaDto[] | object> {
    if (!Number.isNaN(id) && (id) > 0) {
      let data = await getReservasById(id);

      // Verifica se 'data' é null, undefined ou uma lista vazia
      if (data == null || (Array.isArray(data) && data.length === 0)) {
        return {
          'message': 'not content',
          'status': 204
        }

      } else {
        return data;
      }

    } else {
      return {
        'message': 'bad request',
        'status': 400
      }
    }
  }

  async getAnuncioHospedeDataMediaAv(id: string): Promise<getReservaDto[] | object> {
    if(!Number.isNaN(parseInt(id)) && parseInt(id) > 0){
      let dataMediasNotas = await getMediaNotaAnuncio(+id);
      let dataReservas = await getReservasById(+id);
      let dataMaxHospedes = await getQtdMaxHospede(+id);

      const verifyMedia       = (dataMediasNotas == null || (Array.isArray(dataMediasNotas) && dataMediasNotas.length === 0));
      const verifyReservas    = (dataReservas == null || (Array.isArray(dataReservas) && dataReservas.length === 0));
      const verifyMaxHospedes = (dataMaxHospedes == null);

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

  async getUserFromAnuncio(id: number): Promise<getUsuarioDto | any> {
    try {
      const usuario = await getDadosUsuarioAnfitriaoPorIdAnuncio(id);

      if (usuario) {
        return usuario;

      } else {
        throw new Error('Usuário não encontrado');
      }      

    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    
  }

  async getComodidadesByAnuncioId(id: number): Promise<getComodidadesAnuncioDto[] | null> {
    const comodidades = await getComodidadesByAnuncioId(id);
    return comodidades;
  }

  async getFotosByAnuncioId(id: number): Promise<getAnuncioFotosDto[] | null> {
    const listaFotos =  await getFotosByAnuncioId(id)
    return listaFotos;
  }
}