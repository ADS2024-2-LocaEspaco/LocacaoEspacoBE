// import { HttpStatus, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
// import { PrismaClient, status_pagamento } from '@prisma/client';

// import { HostReservaDados, HostReservasRepository } from '../../host_Repositories/host.reserva.repositories';
// import { StatusDeAceiteReserva, StatusPagamento, StatusReserva } from 'src/shared/enum/enums';
// import { throwError } from 'rxjs';
// @Injectable()
// export class HostReservasRepo implements HostReservasRepository {

//   private prisma = new PrismaClient();

//   async getDadosReserva(id_anuncio: number, id_usuario: number): Promise<HostReservaDados[]> {

//     const dadosReserva = await this.prisma.reserva.findMany({

//       where: {
//         id_anuncio: id_anuncio,
//         id_usuario: id_usuario
//       },
//       select: {
//         id: true,
//         id_anuncio: true,
//         id_usuario: true,
//         qtd_adultos: true,
//         qtd_criancas: true,
//         qtd_bebes: true,
//         qtd_pets: true,
//         data_inicial: true,
//         data_final: true,
//         status_reserva: true,
//         status_pagamento: true,
//         multa: true,
//         cancelamento: true,
//         criado_em: true
//       }
//     })


//     return dadosReserva.map((dadosReserva) => ({
//       id: Number(dadosReserva.id),
//       id_anuncio: Number(dadosReserva.id_anuncio),
//       id_usuario: Number(dadosReserva.id_usuario),
//       data_inicial: dadosReserva.data_inicial,
//       data_final: dadosReserva.data_final,
//       qtd_adultos: Number(dadosReserva.qtd_adultos),
//       qtd_criancas: Number(dadosReserva.qtd_criancas),
//       qtd_bebes: Number(dadosReserva.qtd_bebes),
//       qtd_pets: Number(dadosReserva.qtd_pets),
//       status_reserva: dadosReserva.status_reserva as StatusReserva,
//       status_pagamento: dadosReserva.status_pagamento as StatusPagamento,
//       multa: Number(dadosReserva.multa),
//       cancelamento: Number(dadosReserva.cancelamento),
//       criado_em: dadosReserva.criado_em
//     }));
//   }

//   async atualizarStatusDeReserva( id: number, status_reserva: number): Promise<Boolean> {

//     try {

//       if(status_reserva === 0){

//         const stt = StatusReserva.reservado

//         const res = await atualizaStt(id, stt)

//         return res;

//       }else{
//         throw new BadRequestException('')
//       }

//     }catch(err) {

//       if(err instanceof BadRequestException){
//         throw err
//       }

//       throw new NotFoundException('Erro ao atualizar status')
//     }
    
//     async function atualizaStt( id: number, status_reserva: StatusReserva): Promise<Boolean>{
//       const att = await this.prism.reserva.update({
//         where:{ id },
//         data:{ status_reserva }
//       })

//       if(!att || att.length === 0){
//         throw new NotFoundException('Falha ao atualizar status')
//       }
//       return true;
//     }
//   }

//   async atualizarStatusDePagamento( id: number, status_pagamento: number): Promise<Boolean> {


//     const atualizaPag = async (id: number, status_pagamento: StatusPagamento) => {
    
//       const res = await this.prisma.reserva.update({
//         where: {id},
//         data: { status_pagamento}
//       });

//       if(!res){ throw new NotFoundException('Errro ao atualizar o status de pagamento') };

//       return true
//     }

//     try{
//       console.log('status_pagamento:', status_pagamento, typeof status_pagamento);

//       let att: StatusPagamento;

//       if(status_pagamento === 0){
//         att = StatusPagamento.Conclu_do;
//       }
//       else if(status_pagamento === 1){
//         att = StatusPagamento.Aguardando;
//       }
//       else {
//         throw new BadRequestException ('Dados para atualização de pagamento inválido!');
//       }

//       const result = await atualizaPag(id, att);
//       return result
//     } catch (err){

//       if(err instanceof BadRequestException || err instanceof NotFoundException){
//         throw err;
//       }


//     throw new BadRequestException('Erro no servidor', 'Erro ocorrido: >>>>>>>>>>>>>> ' + err);
//   }
//     }


//     // try{

//     //   console.log('status_pagamento:', status_pagamento, typeof status_pagamento);

//     //   if(status_pagamento === 0){

//     //     const att = StatusPagamento.Conclu_do;

//     //     const result = await atualizaPag(id, att, this.prisma);

//     //     return result;

//     //   }else if(status_pagamento === 1 ){

//     //     const att = StatusPagamento.Aguardando;

//     //     const result = await atualizaPag(id, att, this.prisma);

//     //     return result;

//     //   }else{

//     //     throw new BadRequestException('Dados para atualização de pagamento inválido!')
//     //   }


//     // }catch(err) {

//     //   if(err instanceof BadRequestException){
//     //     throw err
//     //   }
//     //   else if(err instanceof NotFoundException){
//     //     throw err
//     //   }
      
//     //   // console.log('ERRO OCORRIDO >>>>>>>>>>> ', err)
//     //   throw new BadRequestException('Erro no servidor', 'Erro ocorrido: >>>>>>>>>>>>>> ' + err)
//     // }catch (err){

//     // }
//     // async function atualizaPag(id: number, status_pagamento: StatusPagamento, prisma: PrismaClient) {
    
//     //   const res = await this.prisma.reserva.update({

//     //     where: { id },
//     //     data: { status_pagamento }
//     //   });
    
//     //   if(!res || res.length === 0){
//     //     throw new NotFoundException('Erro ao atualizar o status de pagamento');
//     //   }

//     //   return true;
//     // }
//   }


//   // async aceitarNegarReservas(status_de_aceitacao: number, id_reserva: number, id_usuario: number): Promise<any> {
//   //   try {

//   //     //faz mais sentido o try catch desse ladp
//   //     if (status_de_aceitacao === 0) {

//   //       const status_aceite = StatusDeAceiteReserva.Aceita

//   //       await this.prisma.reserva.updateMany({
//   //         where: { id: id_reserva, id_usuario },
//   //         data: { status_aceite: status_aceite },
//   //       });

//   //       return HttpStatus.OK;

//   //     } else if (status_de_aceitacao === 1) {

//   //       const status_aceite = StatusDeAceiteReserva.Negada

//   //       await this.prisma.reserva.updateMany({
//   //         where: { id: id_reserva, id_usuario },
//   //         data: { status_aceite: status_aceite },
//   //       });

//   //       return HttpStatus.OK;

//   //     }
//   //     else {

//   //       return HttpStatus.BAD_REQUEST

//   //     }

//   //   } catch (err) {

//   //     console.error("Erro ao aceitar/recusar reserva: ", err);

//   //     throw new BadRequestException('Erro ao processar o status de aceite da reserva');
//   //   }
//   // }