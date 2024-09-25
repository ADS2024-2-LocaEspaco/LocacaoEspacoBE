export interface AnuncioPartial{
    id: string,
    title: string,
    address: string,
    description: string,
    userId: string,
    qtdMaxHospedes: string
}
export interface hostRepositories{
    get_all_locations(id: string): Promise<AnuncioPartial[]>;
}