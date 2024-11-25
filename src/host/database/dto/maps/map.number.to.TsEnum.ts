import { StatusReserva, StatusPagamento, TipoReserva, StatusDeAceiteReserva, TipoDeNotificacao, Checkin, Checkout } from "src/shared/enum/enums";

export const mapToStatusReserva: { [key: number]: StatusReserva } = {
    0: StatusReserva.reservado,
    1: StatusReserva.Processando,
    2: StatusReserva.Finalizado,
    3: StatusReserva.Checkout_pendente
}

export const mapToStatuPagamento: { [key: number ]: StatusPagamento } = {
    0: StatusPagamento.Concluido ,
    1: StatusPagamento.Aguardando
}

export const mapToTipoReserva: { [key: number]: TipoReserva } = {
    0: TipoReserva.instantanea ,
    1: TipoReserva.NaoInstantanea 
}

export const mapToStatusDeAceiteReserva: { [key: number]: StatusDeAceiteReserva } = {
    0: StatusDeAceiteReserva.Aceita ,
    1: StatusDeAceiteReserva.Negada ,
    2: StatusDeAceiteReserva.Aguardando_resposta_anfitiao 
}

export const mapToTipoDeNotificacao: { [key: number]: TipoDeNotificacao } = {
    0: TipoDeNotificacao.Aceita,
    1: TipoDeNotificacao.Negada,
    2: TipoDeNotificacao.Checkout_pendente,
    3: TipoDeNotificacao.Pagamento_Pendente,
    4: TipoDeNotificacao.Multa_Aplicada,
    5: TipoDeNotificacao.Confirmar_Checkout,
    6: TipoDeNotificacao.Checkout_Nao_Identificado,
    7: TipoDeNotificacao.Checkout_realizado_anfitriao,
    8: TipoDeNotificacao.Checkin_realizado_anfitriao
}

export const mapToCheckin: { [key: number]: Checkin } = {
    0: Checkin.Pendente,
    1: Checkin.Realizado,
    2: Checkin.Realizado_por_anfitriao
}

export const mapToCheckout: { [key: number]: Checkout } ={
    0: Checkout.Pendente,
    1: Checkout.Realizado,
    2: Checkout.Realizado_por_anfitriao
}