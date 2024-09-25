import { IsUUID } from 'class-validator';

export class userUuidValidator {

    @IsUUID(1, {message: 'uuid inválido!'})
    userId: string

}


//tratamento de exceção, porém podemos alterar para retornar true ou false para que cada um trate da maneira que achar adequado
//qualquer coisa avisem por favor