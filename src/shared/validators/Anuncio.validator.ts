import { IsUUID } from "class-validator";



export class userUuidValidator {
    
    @IsUUID(1 , { message: 'uuid inválido...' } )
    userId: string

}