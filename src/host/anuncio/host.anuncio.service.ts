import { Injectable, NotFoundException } from '@nestjs/common';
import { AnuncioRepository } from '../database/dto/host.anuncio.dto';



@Injectable()
export class AnuncioService {
  constructor(private readonly locations: AnuncioRepository) {}

  async findAllocations(id: number) {
    try {
      const result = await this.locations.getAnuncioLocations(id);

      console.log(`retornando resultado de getAnuncioLocations (local: host.service.ts)`);

      if (result && result.length > 0) {
        return result;
      } else {
        throw new NotFoundException({
          error: 'Anúncios não encontrados para este usuário',
        });
      }
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }

      console.error(' Código do erro: ' + err);

      throw new Error('Erro ao buscar alocações');
    }
  }

  async getAttrNaoObrigatorios(id: number) {
    try{
      const result = await this.locations.getAnuncioAtrNaObrigatorios(id);

      console.log(`retornando resultado de getAnuncioLocations (local: host.service.ts)`);

      if(result && result.length > 0) {
        
        return result;

      }else {
        throw new NotFoundException({
          error: 'Dados não obrigatórios de anuncio, não encontrados'
        });
      }
    }catch(err){
      if(err instanceof NotFoundException) {
        throw err;
      }

      console.error(' Código do erro: ' + err);

      throw new Error('Erro ao buscar dados não obrigátorios')
    }
  }

  async getQtdSuportada(id: number) {
    try{
      const result = await this.locations.getAnuncioQtdSuportada(id);

      if(result && result.length > 0){
        return result;
      }else{
        throw new NotFoundException({
          error: 'Dados de qtd suportadas não encontrados!'
        });
      }
    }catch (err){
      if(err instanceof NotFoundException) {
        throw err;
      }

      console.error(' Código do erro: ' + err);

      throw new Error('Erro ao buscar quantidades suportadas pelo anuncio.')
    }
  }

  async getPermissoes(id: number){
    try{
      const result = await this.locations.getAnuncioPermissoes(id);

      if(result && result.length > 0){
        return result;
      }else{
        throw new NotFoundException({
          error: 'Dados de permissões não encontrados!'
        });
      }
    }catch (err){
      if(err instanceof NotFoundException) {
        throw err;
      }

      console.error(' Código do erro: ' + err);

      throw new Error('Erro ao buscar  permissoes do anuncio.')
    }
  }

  async getCheckInOut(id: number) {
    try{
      const result = await this.locations.getAnuncioChecks(id);

      if(result && result.length > 0){
        return result;
      }else{
        throw new NotFoundException({
          error: 'Dados de checkin e checkout não encontrados!'
        });
      }
    }catch (err){
      if(err instanceof NotFoundException) {
        throw err;
      }

      console.error(' Código do erro: ' + err);

      throw new Error('Erro ao buscar dados de checkin e checkout do anuncio.')
    }
  }

  async getValores(id: number) {
    try{
      const result = await this.locations.getAnuncioValores(id);

      if(result && result.length > 0){
        return result;
      }else{
        throw new NotFoundException({
          error: 'valores de anuncio não encontrados!'
        });
      }
    }catch (err){
      if(err instanceof NotFoundException) {
        throw err;
      }

      console.error(' Código do erro: ' + err);

      throw new Error('Erro ao buscar os valores do anuncio.')
    }
  }
}

