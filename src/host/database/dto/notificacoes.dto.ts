import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.instace";
import { TipoDeNotificacao } from "src/shared/enum/enums";
import { Prisma } from "@prisma/client";

@Injectable()
export class Notificacoes{
    constructor( private readonly prisma: PrismaService){}

    async notificaUsuario(usuario_id: number, reserva_id: number, tipo: TipoDeNotificacao, mensagem: string){
        try{

            const status = "Enviado"

            const notificar = await this.prisma.notificacao.create({
                data: {
                    usuario_id,
                    reserva_id, 
                    tipo,
                    mensagem,
                    status
                }
            })

            return notificar;

        }catch (err){

            if( err instanceof Prisma.PrismaClientKnownRequestError){

                if (err instanceof Prisma.PrismaClientKnownRequestError) {

                    console.log("Erro do Prisma:", err.code, err.meta);

                    throw new Error(`Erro ao criar notificação: ${err.message}`);
                  }
              
                  console.log("Erro desconhecido ao criar notificação:", err);

                  throw new Error("Erro inesperado ao criar a notificação.");
            }

            console.log('Erro: ', err);

            throw new BadRequestException('Um erro inesperado ocorreu');
        }
    }
}
