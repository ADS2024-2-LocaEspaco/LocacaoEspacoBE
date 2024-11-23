export class anuncioDto {
    id: number | undefined;
    titulo: string | undefined;
    endereco: {} | undefined;
    descricao: string | undefined;
    usuario_id: number | undefined;
    tipo_imoveis_id: number | undefined;
    tipo_espaco_id: number | undefined;
    quant_hospede: number | undefined;
    reservas: [] | undefined;
    criado_em: Date | undefined | null;
}
