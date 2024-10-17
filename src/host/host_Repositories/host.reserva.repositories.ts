export interface HostReservaDados {
  id: number,
  anuncio_id: number,
  usuario_id: number,
  data_inicial: Date,
  data_final: Date,
  num_adultos: number | null,
  num_criancas: number | null,
  num_bebes: number | null,
  num_pets: number | null,
  valor_reserva: number | null,
  num_cartao: number | null,
  checkin: number | null,
  checkout: number | null,
  status_reserva: number | null,
  status_pagamento: number | null,
  multa: number | null,
  cancelamento: number | null,
  solicitante_cancelamento: number | null,
  criado_em: Date
}

export interface AttStatusReserva{
  id: number,
  status_reserva: number
}

export interface AttStatusPagamento{
  id: number,
  status_pagamento: number
}

export interface HostReservasRepository {

  getDadosReserva (id_anuncio: number, id_usuario: number): Promise<HostReservaDados[]>
  
  atualizarStatusDeReserva(data: AttStatusReserva): Promise<Boolean>

  atualizarStatusDePagamento(data: AttStatusPagamento): Promise<Boolean>
  
}