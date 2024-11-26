export interface feedbackRepository {
    //Find user by attribute
    getComentariosAnuncio(anuncioId: number): Promise<any[] | string>;
}