import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { HostReservasRepo } from '../database/dto/host.reserva.dto';

@Injectable()
export class ReservaService {
  constructor(private readonly reserva: HostReservasRepo){}

  async getReservas(id_anuncio: number, id_usuario: number){
    try{
      const result = await this.reserva.getDadosReserva(id_anuncio, id_usuario);

      if(result && result.length > 0){
       
        return result

      }
    }catch (err) {
      if(err.code === 'P2025'){
        throw new NotFoundException(` Reservas para este par de ID's não encontrados:\n Anuncio: ${id_anuncio} \n Usuario ${id_usuario} `)
      }
      
      console.error(' Código do erro: ' + err);

      throw new Error('Erro ao buscar por reservas!');
    }
  }
  
  async attPagamento(data: {id:number, status_pagamento: number}){
    try {
      const result = await this.reserva.atualizarStatusDePagamento(data)

      if(result === true ){
        return result
      }

      return false
      
    } catch (err) {
      
      if(err.code === 'P2025') {
        throw new NotFoundException(`Reserva com ID ${data.id} não encontrada!`)
      }
      throw new HttpException('Erro ao atualizar status da reserva', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

