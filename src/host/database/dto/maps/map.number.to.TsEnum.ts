import { StatusReserva, StatusPagamento, TipoReserva, StatusDeAceiteReserva } from "src/shared/enum/enums";

export const mapToStatusReserva: { [key: number]: StatusReserva } = {
    0: StatusReserva.reservado,
    1: StatusReserva.Processando,
    2: StatusReserva.Finalizado,
    3: StatusReserva.Checkout_pendente
}

export const mapToStatuPagamento: { [key: number ]: StatusPagamento } ={
    0: StatusPagamento.Concluido ,
    1: StatusPagamento.Aguardando
}

export const mapToTipoReserva: { [key: number]: TipoReserva } = {
    0: TipoReserva.instantanea ,
    1: TipoReserva.NaoInstantanea 
}

export const mapToStatusDeAceiteReserva: { [key: number]: StatusDeAceiteReserva } ={
    0: StatusDeAceiteReserva.Aceita ,
    1: StatusDeAceiteReserva.Negada ,
    2: StatusDeAceiteReserva.Aguardando_resposta_anfitiao 
}