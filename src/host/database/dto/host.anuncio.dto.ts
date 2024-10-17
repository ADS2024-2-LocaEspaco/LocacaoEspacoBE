import { Injectable } from '@nestjs/common';
import {
  Anuncio_Atributos_Não_Obrigatorios,
  Anuncio_checkInOut,
  Anuncio_Permissoes,
  Anuncio_qtds_suportadas,
  Anuncio_valores,
  AnuncioPartial,
  HostRepositories,
} from '../../host_Repositories/host.anuncio.respositories';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class AnuncioRepository implements HostRepositories {
  private prisma = new PrismaClient();


  async getAnuncioLocations(id: number): Promise<AnuncioPartial[]> {
    const anuncios = await this.prisma.anuncio.findMany({
      where: {
        usuario_id: id,
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

    return anuncios.map((anuncio) => ({
      id: Number(anuncio.id),
      usuario_id: Number(anuncio.usuario_id),
      tipo_espaco_id: Number(anuncio.tipo_espaco_id),
      tipo_imoveis_id: Number(anuncio.tipo_imoveis_id),
      titulo: anuncio.titulo,
      descricao: anuncio.descricao,
      url_imgs: anuncio.url_imgs,
      polit_cancelamento: Number(anuncio.polit_cancelamento),
    }));
  }

  async getAnuncioAtrNaObrigatorios(
    id: number,
  ): Promise<Anuncio_Atributos_Não_Obrigatorios[]> {
    const result = await this.prisma.anuncio.findMany({
      where: {
        usuario_id: id,
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

    return result.map((result) =>({
        cftv: result.cftv,
        monitoramento_ruido: result.monitoramento_ruido,
        armas: result.armas,
        aprovacao_reserva: result.aprovacao_reserva,
        horario_silencio: result.horario_silencio,
        horario_silencio_inicio: result.horario_silencio_inicio,
        horario_silencio_fim: result.horario_silencio_fim,
        fotografia_comercial: result.fotografia_comercial,
        regras_adicionais: result.regras_adicionais,
        criado_em: result.criado_em,
        publicado: result.publicado,
        temp_antec_reserva: result.temp_antec_reserva !== null ? Number(result.temp_antec_reserva) : null
    }))
  }

  async getAnuncioQtdSuportada(id: number): Promise<Anuncio_qtds_suportadas[]> {
    const qtd = await this.prisma.anuncio.findMany({
      where: {
        usuario_id: id,
      },
      select: {
        quant_quartos: true,
        quant_banheiro: true,
        quant_cama: true,
        quant_hospede: true,
      },
    });

    return qtd.map((qtd) =>({
      quant_quartos: Number(qtd.quant_quartos),
      quant_banheiro: Number(qtd.quant_banheiro),
      quant_cama: Number(qtd.quant_cama),
      quant_hospede: Number(qtd.quant_hospede)
    }))
  }

  async getAnuncioPermissoes(id: number): Promise<Anuncio_Permissoes[]> {
    const permissoes =  await this.prisma.anuncio.findMany({
      where: {
        usuario_id: id,
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

    return permissoes.map((permissoes) =>({
      aceita_crianca: permissoes.aceita_crianca,
      aceita_bebe: permissoes.aceita_bebe,
      aceita_pet: permissoes.aceita_pet,
      quant_pet: permissoes.quant_pet !== null ? Number(permissoes.quant_pet) : null,
      permite_eventos: permissoes.permite_eventos,
      permite_fumar: permissoes.permite_fumar
    }))
  }

  async getAnuncioChecks(id: number): Promise<Anuncio_checkInOut[]> {
    return await this.prisma.anuncio.findMany({
      where: {
        usuario_id: id,
      },
      select: {
        checkin_inicio: true,
        checkin_fim: true,
        checkout: true,
      },
    });
  }

  async getAnuncioValores(id: number): Promise<Anuncio_valores[]> {
    const valores = await this.prisma.anuncio.findMany({
      where: {
        usuario_id: id,
      },
      select: {
        valor_diaria: true,
        quant_diaria_min: true,
        quant_diaria_max: true,
      },
    });

    return valores.map((valores) =>({
      valor_diaria: valores.valor_diaria,
      quant_diaria_min: valores.quant_diaria_min !== null ? Number(valores.quant_diaria_min) : null,
      quant_diaria_max: valores.quant_diaria_max !== null ? Number(valores.quant_diaria_max) : null
    }))
  }
}
