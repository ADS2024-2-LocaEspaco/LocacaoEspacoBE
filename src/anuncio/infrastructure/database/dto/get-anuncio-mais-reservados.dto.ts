export type GetAnunciosMaisReservados = {
  id: number;
  fotos: string[];
  titulo: string | null;
  endereco: object;
  valor_diaria: number;
  avalicacao: number[];
  reserva: object[];
};
