import { Type } from "class-transformer";
import { IsIn, IsInt, IsNotEmpty, Max, MaxLength, Min, MinLength } from "class-validator";

export class ValidadorParaAtualizarStatusDeReserva {

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    id: number;
  
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(3)
    @Type(() => Number)
    status: number;
  
  }

  export class ValidadorParaAtualizarStatusDeAceiteReserva {

    @IsNotEmpty()
    @IsInt()
    @IsIn([0, 1], { message: 'Impossivel valor diferentes de "aceitar" e "negar"'})
    @Type(() => Number)
    status_aceite: number;
  
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    id_reserva: number;
  
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    id_usuario: number;
  
  }
  
  export class ValidadorDeDadosAlteradosAnfitriao {

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  id_reserva: number
  
  @IsInt()
  @Min(1)
  @Type(() => Number)
  id_usuario: number

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(254)
  mensagem: string

  }