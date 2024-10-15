import { Injectable, NotFoundException } from '@nestjs/common';
import { HostRepository, HostReservasRepo } from './host_Repositories/host.repository';


@Injectable()
export class HostService {
  constructor(private readonly locations: HostRepository) {}

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

@Injectable()
export class HostReservaDados{
  constructor(private readonly reserva: HostReservasRepo){}

  async getRervas(id_anuncio: number, id_usuario: number){
    try{
      const result = await this.reserva.getDadosReserva(id_anuncio, id_usuario);

      if(result && result.length > 0){
       
        return result

      }else{
        throw new NotFoundException({
          error: 'Reservas não encontradas!'
        });
      }
    }catch (err) {
      if(err instanceof NotFoundException) {
        throw err;
      }

      console.error(' Código do erro: ' + err);

      throw new Error('Erro ao buscar por reservas!');
    }
  }
}