export class AnuncioEntity {
    private readonly id: string;
    private readonly title: string;
    private readonly address: string;
    private descrption: string;
    private userId: string;
    private tipoImovelId: string;
    private tipoEspacoId: string;
    private qtdMaxHospedes: string;
    private feedback: string;
    private createdAt: Date;
    
  
    get getId(): string {
      return this.id;
    }
  
    get getTitle(): string {
      return this.title;
    }

    get getAddress(): string {
      return this.address;
    }

    get getDescription(): string {
      return this.descrption;
    }

    get getUserId(): string {
      return this.userId;
    }

    get getTipoImovelId(): string {
      return this.tipoImovelId;
    }
   
    get getTipoEspacoId(): string {
      return this.userId;
    }

    get getQtdMaxHospedes(): string {
      return this.qtdMaxHospedes;
    }

    get getFeedback(): string {
      return this.feedback;
    }

    get getCreatedAt(): Date {
      return this.createdAt;
    }
  }
  