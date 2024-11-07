import { StatusPagamento, StatusReserva } from "src/shared/enum/enums"

export interface HostReservaDados {
  id: number,
  id_usuario: number,
  id_anuncio: number,
  qtd_adultos: number | null,
  qtd_criancas: number | null,
  qtd_bebes: number | null,
  qtd_pets: number | null,
  data_inicial: Date | null,
  data_final: Date | null,
  status_reserva: StatusReserva | null,
  status_pagamento: StatusPagamento | null,
  multa: number | null,
  cancelamento: number | null,
  criado_em: Date | null
}




export interface HostReservasRepository {

  getDadosReserva(id_anuncio: number, id_usuario: number): Promise<HostReservaDados[]>

  getHistorico(status_reserva: number, de: Date, ate: Date): Promise<HostReservaDados[]>

  atualizarStatusDeReserva(id: number, status_reserva: number): Promise<Boolean>

  atualizarStatusDePagamento(id: number, status_pagamento: number): Promise<Boolean>

}
