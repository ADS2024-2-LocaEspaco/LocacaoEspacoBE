export class FeedbackEntity {
    private readonly id: string;
    private readonly anuncioId: string;
    private readonly userId: string;
    private descricao: string;
    private nota: number;
  
    get getId(): string {
      return this.id;
    }
  
    get getAnuncioId(): string {
      return this.anuncioId;
    }

    get getUserId(): string {
      return this.userId;
    }

    get getNota(): number {
      return this.nota;
    }

    get geDescricao(): string {
      return this.descricao;
    }
  }
  