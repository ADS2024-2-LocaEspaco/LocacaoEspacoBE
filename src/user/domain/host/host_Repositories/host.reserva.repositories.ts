export interface HostReservaDados {
  id: number,
  anuncio_id: number,
  usuario_id: number,
  data_inicial: Date,
  data_final: Date,
  num_adultos: number,
  num_criancas: number,
  num_bebes: number,
  num_pets: number,
  valor_reserva: number,
  num_cartao: number,
  checkin: number,
  checkout: number,
  status_reserva: number,
  status_pagamento: number,
  multa: number,
  cancelamento: number,
  solicitante_cancelamento: number,
  criado_em: Date
}

export interface HostReservasRepository {

  getDadosReserva (id_anuncio: number, id_usuario: number): Promise<HostReservaDados[]>
}