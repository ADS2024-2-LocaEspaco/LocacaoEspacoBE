import { IsUUID } from "class-validator";



export class userUuidValidator {

    // @IsNotEmpty({message: 'ID do usuário deve ser passado, para acessar os dados de anuncio.'})
    @IsUUID(1, { message: 'UUID inválido!' } )
    userId: string

}