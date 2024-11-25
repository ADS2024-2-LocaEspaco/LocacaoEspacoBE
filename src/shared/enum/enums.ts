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

export enum TipoDeNotificacao {
    Aceita = 'Reserva Aceita',
    Negada = 'Reserva Negada',
    Checkout_pendente = 'Checkout Pendente',
    Pagamento_Pendente = 'Pagamento Pendente',
    Multa_Aplicada = 'Multa Aplicada',
    Confirmar_Checkout = 'Confirmar Checkout',
    Checkout_Nao_Identificado = 'Checkout não identificado',
    Checkout_realizado_anfitriao = 'Chekout foi realizado pelo anfitrião',
    Checkin_realizado_anfitriao = 'Checkin foi realizado pelo anfitrião'
}

export enum Checkout {
    Realizado = 'Checkout Realizado',
    Pendente = 'Checkout pendente',
    Realizado_por_anfitriao = 'Checkout realizado pelo anfitriao'
}

export enum Checkin {
    Realizado = 'Checkin Realizado',
    Pendente = 'Checkin pendente',
    Realizado_por_anfitriao = 'Checkin realizado pelo anfitriao'
}