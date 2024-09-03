import { Anuncio } from "@prisma/client";

export interface hostRepositories{
    get_all_locations(id: string): Promise<Anuncio[]>;
}