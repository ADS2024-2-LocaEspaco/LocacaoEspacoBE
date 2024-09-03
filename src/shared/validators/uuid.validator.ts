import { Injectable } from '@nestjs/common';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ValidateUuid{

async isUuid(id: string){
    if(!isUUID(id)){
        return false
        }
    else{
        return true
        }
    }
}

//tratamento de exceção, porém podemos alterar para retornar true ou false para que cada um trate da maneira que achar adequado
//qualquer coisa avisem por favor