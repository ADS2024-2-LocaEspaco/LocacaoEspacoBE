import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { HostReservasRepo } from '../database/dto/host.reserva.dto';
import { StatusReserva, StatusPagamento } from 'src/shared/enum/enums';
import { isDate } from 'util/types';

@Injectable()
export class ReservaService {
  constructor(private readonly reserva: HostReservasRepo){}

  async getReservas(id_anuncio: number, id_usuario: number){
    try{

      console.log('passando em getReserva');

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

  async attStatusReserva(dados: {id: number, status_reserva: number}){
    try{

      const { id, status_reserva} = dados;

      if(status_reserva === 0) {

        const data = {id, status_reserva: StatusReserva.Processando};

        const resultadoAttStatusReserva = await this.reserva.atualizarStatusDeReserva(data);

        return resultadoAttStatusReserva

      }else  if(status_reserva === 1) {
        
        const data = {id, status_reserva: StatusReserva.reservado}

        const resultadoAttStatusReserva = await this.reserva.atualizarStatusDeReserva(data);

        return resultadoAttStatusReserva
        
      }else{
        throw new BadRequestException('Opção inválida para status do pagamento!')
      }


    } catch (err) {

      if(err instanceof BadRequestException) {
          throw err;
      }

      throw new NotFoundException('Erro ao atualizar status da reserva');
    }
  }

  async attPagamento(dados: {id:number, status_pagamento: number}){
    try {
      const {id, status_pagamento} = dados 

      if(status_pagamento === 0){
        const data = {id, status_pagamento: StatusPagamento.Conclu_do};

        const resultadoAttStatusPagamento = await this.reserva.atualizarStatusDePagamento(data);

        return resultadoAttStatusPagamento;

      }else if(status_pagamento === 1){

        const data = {id, status_pagamento: StatusPagamento.Aguardando}

        const resultadoAttStatusPagamento = await this.reserva.atualizarStatusDePagamento(data); 

        return resultadoAttStatusPagamento;

      }else {

        throw new BadRequestException('Opção status do pagamento inválida!')
        
      }

      
    } catch (err) {
      
      if(err instanceof BadRequestException) {
        
        throw err;

      }

      throw new NotFoundException('Erro ao atualizar pagamento')


    }
  }

  async getHistorico(status: number, de: Date, ate: Date){
    try{

      const inicial = new Date(de)
      const final = new Date(ate)
      

      if(status === 0){
        const stats = StatusReserva.Processando

        const result = await this.reserva.getHistorico(stats, inicial, final)

        if(!result || result.length === 0){
        
          throw new NotFoundException('Reservas não encontradas para esta data');
  
        }

        return result
        
      }else if(status === 1) {
        const stats = StatusReserva.reservado

        const result = await this.reserva.getHistorico(stats, inicial, final)

        if(!result || result.length === 0){
        
          throw new NotFoundException('Reservas não encontradas para esta data');
  
        }

        return result;

      }else {
        throw new BadRequestException('Status inválido')
      }

    }catch (err) {
      
      if(err instanceof NotFoundException){

        throw err
        
      }else if( err instanceof BadRequestException){

        throw err

      }
      
      console.log("Código do erro " + err)

      throw new BadRequestException('Erro ao procurar por reservas entre estas datas')
    }
  }
}

