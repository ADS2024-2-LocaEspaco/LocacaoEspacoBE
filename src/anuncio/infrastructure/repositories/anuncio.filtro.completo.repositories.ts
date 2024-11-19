import { tipo_reserva, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAdvancedSearch(
    tipo_imovel_id: number[], 
    min_value: number, 
    max_value: number, 
    bath_quantity: number,
    room_quantity: number,
    comodidades: number[],
    reserva: tipo_reserva,
    accessibilities: number[]
): Promise<any> {

    const response = await prisma.anuncio.findMany({
        where: {
            tipo_imovel_id: {
                in: tipo_imovel_id
            },
            valor_diaria: {
                gte: min_value,
                lte: max_value
            },
            banheiros: {
                gte: bath_quantity 
            },
            quartos: {
                gte: room_quantity
            },
            comodidade_id: {
                in: comodidades
            },
            tipo_reserva_atual: {
                equals: reserva
            },
            acessibilidade_id: {
                in: accessibilities
            }
        }
    })
}