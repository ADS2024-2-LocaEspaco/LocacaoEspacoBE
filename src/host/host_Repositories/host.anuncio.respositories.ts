import { Decimal } from "@prisma/client/runtime/library";
import { TipoReserva } from "src/shared/enum/enums";

export interface HostAnuncioDados{
    id: number,
    foto_id: number,   
    titulo: string | null,
    hospedes: number,
    quartos: number,
    banheiros: number,
    descricao: string | null,
    valor_diaria: Decimal,   
    publicado: boolean,
    data_checkin: Date,
    data_checkout: Date,
    cameras: boolean,
    regra_da_casa: string,
    politica_cancelamento: string,
    tipo_reserva_atual: TipoReserva,
    anfitriao: number, //user_id
    comodidadnumbere_id: number,
    tipo_imovel_id: number,
    tipo_espaco_id: number,
    seguranca_id: number,
    tipo_hospede_id: number,
  }
  export interface HostRepositories {

    getAnuncioByLocalName (): Promise<HostAnuncioDados[]>

}

