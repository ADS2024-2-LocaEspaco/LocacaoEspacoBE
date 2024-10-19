import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { HostReservasRepo } from '../database/dto/host.reserva.dto';
import e from 'express';

@Injectable()
export class ReservaService {
  constructor(private readonly reserva: HostReservasRepo){}

  async getReservas(id_anuncio: number, id_usuario: number){
    try{
      const result = await this.reserva.getDadosReserva(id_anuncio, id_usuario);

      if(!result || result.length === 0){
       
        throw new NotFoundException('Reservas não encontradas');

      }
      
      return result;

    }catch (err) {

      if(err instanceof NotFoundException){

        throw err
      }
      
      console.error(' Código do erro: ' + err);

      throw new BadRequestException('Erro ao buscar por reservas!');
    }
  }

  async attStatusReserva(data: {id: number, status_reserva: number}){
    try{

      const resultadoAttStatusReserva = await this.reserva.atualizarStatusDeReserva(data);

      if(!resultadoAttStatusReserva) {
        throw new NotFoundException('Reservas não encontradas!');
        
      }

      return resultadoAttStatusReserva;

    } catch (err) {

      if(err instanceof NotFoundException) {
          throw err;
      }

      throw new BadRequestException('Erro ao atualizar status da reserva');
    }
  }

  async attPagamento(data: {id:number, status_pagamento: number}){
    try {
      const resultadoAttStatusPagamento = await this.reserva.atualizarStatusDePagamento(data);

      if(!resultadoAttStatusPagamento){

        throw new NotFoundException('Reservas não encontradas');

      }

      return resultadoAttStatusPagamento;
      
    } catch (err) {
      
      if(err instanceof NotFoundException) {
        
        throw err;

      }

      throw new BadRequestException('Erro ao atualizar status do pagamento');

    }
  }

}

