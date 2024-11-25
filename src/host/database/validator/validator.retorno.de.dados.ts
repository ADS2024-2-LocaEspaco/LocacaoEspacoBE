import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class ValidadorParaIdReserva {

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    id_anuncio: number;
    
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    id_usuario: number;
  
  }

  export class ValidadorParaDadosDeHistorico {

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(3)
    @Type(() => Number)
    status_reserva: number;
  
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    dataInicial: Date;
  
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    dataFinal: Date;
  }