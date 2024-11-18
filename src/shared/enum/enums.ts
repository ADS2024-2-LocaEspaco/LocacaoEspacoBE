export enum StatusReserva {
    reservado = 'Reservado',
    Processando = 'Processando',
    Finalizado = 'Finalizado',
    Checkout_pendente = 'Confirmação de checkout pendente'
}

export enum StatusPagamento {
    Concluido = 'Concluído',
    Aguardando = 'Aguardado'
}

export enum TipoReserva {
    instantanea = 'Instantânea',
    NaoInstantanea = 'Não instantânea'
}

export enum StatusDeAceiteReserva {
    Aceita = 'Aceita',
    Negada = 'Negada',
    Aguardando_resposta_anfitiao = 'Aguardando resposta'
}