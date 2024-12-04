import { Injectable, PipeTransform, HttpStatus, HttpException, BadRequestException, ExceptionFilter } from '@nestjs/common';
import { anuncio, avaliacao, PrismaClient, reserva, usuario } from '@prisma/client';
import { error } from 'console';
import { getReservaDto } from './database/dto/get-reserva.dto';
import { GetComentariosDto } from 'src/anuncio/infrastructure/database/dto/get-comentarios.dto';
import { getReservasById, getAnuncioById, getDadosUsuarioAnfitriaoPorIdAnuncio, getComodidadesByAnuncioId, getFotosByAnuncioId, getMediaNotaAnuncio, getPoliticaCancelamento, getAnuncio, getComentarioAnuncio, getQtdMaxHospede } from './repositories/anuncio.repositories';
import { getAnuncioDto } from './database/dto/get-anuncio.dto';
import { getUsuarioDto } from './database/dto/get-anuncio-usuario.dto';
import { getAnuncioFotosDto } from './database/dto/get-anuncio-fotos.dto';
import { getComodidadesAnuncioDto } from './database/dto/get-comodidade-anuncio.dto';
import { Request, Response } from 'express';

@Injectable()
export class AnuncioService {
  private readonly prisma = new PrismaClient();
  
  async getAnuncio(id: string): Promise<anuncio> {
    if(!Number.isNaN(parseInt(id)) && parseInt(id) > 0){
      let result = await getAnuncio(+id)

      if (result == null) {
        throw new HttpException('Not Content', HttpStatus.NO_CONTENT);

      } else {
        return result;
      }

    }else{
      throw new BadRequestException();
    }
  }

  async getQuantMaxEMinDiaria(id: string): Promise<object> {
    if(!Number.isNaN(parseInt(id)) && parseInt(id) > 0){
      let result = await getAnuncio(+id)

      if (result == null) {
        throw new HttpException('Not Content', HttpStatus.NO_CONTENT);

      } else {
        return {
          dias_minimo_duracao : result.dias_minimo_duracao,
          dias_maximo_duracao : result.dias_maximo_duracao,
        };
      }

    }else{
      throw new BadRequestException();
    }
  }

  async getPoliticaCancelamento(id: string): Promise<object> {
    if(!Number.isNaN(parseInt(id)) && parseInt(id) > 0){
      let result = await getPoliticaCancelamento(+id)

      if (result.politica_cancelamento == null) {
        throw new HttpException('Not Content', HttpStatus.NO_CONTENT);

      } else {
        return {
          politica_cancelamento : result.politica_cancelamento,
        };
      }

    }else{
      throw new BadRequestException();
    }
  }

  async getComentariosUsuarios(id: string): Promise<GetComentariosDto[] | ExceptionFilter> {
    if(!Number.isNaN(parseInt(id)) && parseInt(id) > 0){
      let data = await getComentarioAnuncio(+id);

      if(data == null || data.length == 0){
        throw new HttpException('Not Content', HttpStatus.NO_CONTENT);

      }else{
        return data
      }

    }else{
      throw new BadRequestException();
    }
  }

  async getComentarioUnicoUsuario(data: any): Promise<GetComentariosDto[]> {
    if(!Number.isNaN(parseInt(data.id_anuncio)) && parseInt(data.id_anuncio) > 0 && !Number.isNaN(parseInt(data.id_usuario)) && parseInt(data.id_usuario) > 0){
      let comentario = await getComentarioAnuncio(data);

      if(comentario == null || comentario.length == 0){
        throw new HttpException('Not Content', HttpStatus.NO_CONTENT);

      }else{
        return comentario
      }

    }else{
      throw new BadRequestException();
    }
  }

  async getAnuncioById(id: number): Promise<getAnuncioDto | any> {
    if(!Number.isNaN(id) && id > 0){
      let data = await getAnuncioById(id);

      if(data == null){
        throw new HttpException('Not Content', HttpStatus.NO_CONTENT);

      }else{
        return data
      }

    }else{
      throw new BadRequestException();
    }
  }

  async getReservas(id: number): Promise<getReservaDto[] | object> {
    if (!Number.isNaN(id) && (id) > 0) {
      let data = await getReservasById(id);

      // Verifica se 'data' é null, undefined ou uma lista vazia
      if (data == null || (Array.isArray(data) && data.length === 0)) {
        throw new HttpException('Not Content', HttpStatus.NO_CONTENT);

      } else {
        return data;
      }

    } else {
      throw new BadRequestException();
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
        throw new HttpException('Not Content', HttpStatus.NO_CONTENT);

      } else {
        let dataFinal = {
          id: id,
          media_notas: dataMediasNotas._avg,
          datas_reservas: dataReservas,
          quant_hospedes: dataMaxHospedes,
        }
        return dataFinal;
      }

    }else{
      throw new BadRequestException();
    }
  }

  async getUserFromAnuncio(id: number): Promise<getUsuarioDto> {
    try {
      const usuario = await getDadosUsuarioAnfitriaoPorIdAnuncio(id);

      if (usuario) {
        return usuario;

      } else {
        throw new HttpException('Not Content', HttpStatus.NO_CONTENT);
      }      

    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Erro');
    }
    
  }

  async getComodidadesByAnuncioId(id: number): Promise<getComodidadesAnuncioDto[]> {
    if(!Number.isNaN(id) && id > 0){
      let data = await await getComodidadesByAnuncioId(id);

      if(data == null || data.length == 0){
        throw new HttpException('Not Content', HttpStatus.NO_CONTENT);

      }else{
        return data
      }

    }else{
      throw new BadRequestException();
    }
  }

  async getFotosByAnuncioId(id: number): Promise<getAnuncioFotosDto[]> {
    if(!Number.isNaN(id) && id > 0){
      let data = await await await getFotosByAnuncioId(id);

      if(data == null || data.length == 0){
        throw new HttpException('Not Content', HttpStatus.NO_CONTENT);

      }else{
        return data
      }

    }else{
      throw new BadRequestException();
    }
  }
}