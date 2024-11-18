import { StatusReserva, StatusPagamento, TipoReserva, StatusDeAceiteReserva } from "src/shared/enum/enums";
import { status_reserva, status_pagamento, tipo_reserva, status_aceite_reserva } from "@prisma/client";

export const mapStatusReservaToPrisma: { [ key in StatusReserva]: status_reserva } = {
    [StatusReserva.reservado]: status_reserva.Reservado,
    [StatusReserva.Processando]: status_reserva.Processando,
    [StatusReserva.Finalizado]: status_reserva.Finalizado,
    [StatusReserva.Checkout_pendente]: status_reserva.Checkout_pendente
}

export const mapStatusPagamentoToPrisma: { [ key in StatusPagamento ]: status_pagamento } = {
    [StatusPagamento.Concluido]: status_pagamento.Conclu_do,
    [StatusPagamento.Aguardando]: status_pagamento.Aguardando
}

export const mapTipoReservaToPrisma: { [ key in TipoReserva ]: tipo_reserva } = {
    [TipoReserva.instantanea]: tipo_reserva.Instant_nea,
    [TipoReserva.NaoInstantanea]: tipo_reserva.N_o_instant_nea
}

export const mapStatusDeAceiteReservaToPrisma: { [ keyn in StatusDeAceiteReserva]: status_aceite_reserva } = {
    [StatusDeAceiteReserva.Aceita]: status_aceite_reserva.Aceita,
    [StatusDeAceiteReserva.Negada]: status_aceite_reserva.Negada,
    [StatusDeAceiteReserva.Aguardando_resposta_anfitiao]: status_aceite_reserva.Aguardando_resposta_anfitiao
}