import { Injectable } from '@nestjs/common';
import {
  Anuncio_Atributos_Não_Obrigatorios,
  Anuncio_checkInOut,
  Anuncio_Permissoes,
  Anuncio_qtds_suportadas,
  Anuncio_valores,
  AnuncioPartial,
  hostRepositories,
} from './host.respositories';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class HostRepository implements hostRepositories {
  private prisma = new PrismaClient();

  async getAnuncioLocations(id: number): Promise<AnuncioPartial[]> {
    return await this.prisma.anuncio.findMany({
      where: {
        id: id,
      },
      select: {
        id: true,
        usuario_id: true,
        tipo_espaco_id: true,
        tipo_imoveis_id: true,
        titulo: true,
        descricao: true,
        url_imgs: true,
        polit_cancelamento: true,
      },
    });
  }

  async getAnuncioAtrNaObrigatorios(
    id: number,
  ): Promise<Anuncio_Atributos_Não_Obrigatorios[]> {
    return await this.prisma.anuncio.findMany({
      where: {
        id: id,
      },
      select: {
        cftv: true,
        monitoramento_ruido: true,
        armas: true,
        aprovacao_reserva: true,
        horario_silencio: true,
        horario_silencio_inicio: true,
        horario_silencio_fim: true,
        fotografia_comercial: true,
        regras_adicionais: true,
        criado_em: true,
        publicado: true,
        temp_antec_reserva: true,
      },
    });
  }

  async getAnuncioQtdSuportada(id: number): Promise<Anuncio_qtds_suportadas[]> {
    return await this.prisma.anuncio.findMany({
      where: {
        id: id,
      },
      select: {
        quant_quartos: true,
        quant_banheiro: true,
        quant_cama: true,
        quant_hospede: true,
      },
    });
  }

  async getAnuncioPermissoes(id: number): Promise<Anuncio_Permissoes[]> {
    return await this.prisma.anuncio.findMany({
      where: {
        id: id,
      },
      select: {
        aceita_crianca: true,
        aceita_bebe: true,
        aceita_pet: true,
        quant_pet: true,
        permite_eventos: true,
        permite_fumar: true,
      },
    });
  }

  async getAnuncioChecks(id: number): Promise<Anuncio_checkInOut[]> {
    return await this.prisma.anuncio.findMany({
      where: {
        id: id,
      },
      select: {
        checkin_inicio: true,
        checkin_fim: true,
        checkout: true,
      },
    });
  }

  async getAnuncioValores(id: number): Promise<Anuncio_valores[]> {
    return await this.prisma.anuncio.findMany({
      where: {
        id: id,
      },
      select: {
        valor_diaria: true,
        quant_diaria_min: true,
        quant_diaria_max: true,
      },
    });
  }
}
