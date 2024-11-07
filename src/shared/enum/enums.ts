export enum StatusReserva {
    reservado = 'Reservado',
    Processando = 'Processando',
    Finalizado = 'Finalizado',
    Checkou_pendente = 'Confirmação de checkout pendente'
}

export enum StatusPagamento {
    Conclu_do = 'Concluído',
    Aguardando = 'Aguardado'
}

export enum TipoReserva {
    instantanea = 'Instantânea',
    naoInstantanea = 'Não instantânea'
}

export enum StatusDeAceiteReserva {
    Aceita = 'Aceita',
    Negada = 'Negada',
    Aguardando_resposta_anfitiao = 'Aguardando resposta'
}