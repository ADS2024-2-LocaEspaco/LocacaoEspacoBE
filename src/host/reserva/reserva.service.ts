import { Injectable } from '@nestjs/common';
import { DadosDeReserva } from '../database/dto/get.dados.reserva.dto';
import { mapToStatuPagamento, mapToStatusDeAceiteReserva, mapToStatusReserva } from '../database/dto/maps/map.number.to.TsEnum';
import { AtualizarDadosDeReserva } from '../database/dto/att.dados.reserva.dto';
import { AlteracoesAnfitriao } from '../database/dto/anfitriao.altera.dados';

@Injectable()
export class ReservaService {
  constructor(private readonly reservaDados: DadosDeReserva, private readonly statusReservas: AtualizarDadosDeReserva, private readonly anfitriao: AlteracoesAnfitriao) { }

  async getReservas( id_usuario: number) {
 
      console.log('passando em getReserva');

      const result = await this.reservaDados.getDadosReserva( id_usuario);

      return result;
 
  }

  async attStatusReserva(data: {id: number, status_reserva: number} ) {

    const { id, status_reserva} = data;
    
    const status = mapToStatusReserva[status_reserva]
    
    const resultadoAttStatusReserva = await this.statusReservas.atualizarStatusDeReserva(id, status);

    return resultadoAttStatusReserva

  }

  async attPagamento(dados: { id: number, status_pagamento: number }) {
    
    const { id, status_pagamento } = dados
    
    const status = mapToStatuPagamento[status_pagamento]

    const resul = await this.statusReservas.atualizarStatusDePagamento(id, status)

    return resul

  }

  async getHistorico(status_reserva: number, de: Date, ate: Date) {

      const inicial = new Date(de)
      const final = new Date(ate)

      const stt = mapToStatusReserva[status_reserva]

      const res = await this.reservaDados.getHistorico(stt, inicial, final)

      return res
  }

  async aceitarNegarReservas(status: number, id_reserva: number, id_usuario: number) {

    const stt = mapToStatusDeAceiteReserva[status]

    const result = await this.statusReservas.aceitarNegarReservas(stt, id_reserva, id_usuario);

    return result

  }

  async checkoutAnfitriao( id_reserva: number, id_usuario: number, mensagem: string){

    const result = await this.anfitriao.checkoutDoAnfitriao(id_reserva, id_usuario, mensagem)

    return result;

  }

  async checkinAnfitriao( id_reserva: number, id_usuario: number, mensagem: string){
    
    const result = await this.anfitriao.checkinDoAnfitriao(id_reserva, id_usuario, mensagem)

    return result;
    
  }

  async todosDadosRetornados( id_usuario: number){

    const dados = await this.reservaDados.getDadosURA(id_usuario);

    return dados;
  }
}

