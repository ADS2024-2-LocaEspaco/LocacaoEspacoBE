import { Type } from "class-transformer";
import { IsIn, IsInt, IsNotEmpty, Length, Max, Min } from "class-validator";


export class validatorParaNotificacoes {
    
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Type(() => Number) 
    id_usuario: number

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Type(() => Number) 
    id_reserva: number

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(8)
    @Type(() => Number)
    tipo: number

    @IsNotEmpty()
    @Length(1, 255, { message: 'A mensagem deve ter no máximo 254 caracteres!'})
    mensagem: string

}