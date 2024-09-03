import { BadRequestException, Injectable } from '@nestjs/common';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ValidateUuid{

async isUuid(id: string){
    if(!isUUID(id)){
        throw new BadRequestException('ID inválido!')
        }
    else{
        return "Id validado!"
        }
    }
}

//tratamento de exceção, porém podemos alterar para retornar true ou false para que cada um trate da maneira que achar adequado
//qualquer coisa avisem por favor