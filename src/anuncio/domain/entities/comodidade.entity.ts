export class ComodidadeEntity {
    private readonly id: string;
    private readonly anuncioId: string;
    private readonly descricao: string;
    private readonly categoria: string;
    private readonly principal: boolean;
    private readonly createdAt: Date;
  
    constructor(data: {
      id: string;
      anuncioId: string;
      descricao: string;
      categoria: string;
      principal: boolean;
      createdAt: Date;
    }) {
      this.id = data.id;
      this.anuncioId = data.anuncioId;
      this.descricao = data.descricao;
      this.categoria = data.categoria;
      this.principal = data.principal;
      this.createdAt = data.createdAt;
    }
  
    get getId(): string {
      return this.id;
    }
  
    get getAnuncioId(): string {
      return this.anuncioId;
    }
  
    get getDescricao(): string {
      return this.descricao;
    }
  
    get getCategoria(): string {
      return this.categoria;
    }
  
    get getPrincipal(): boolean {
      return this.principal;
    }
  
    get getCreatedAt(): Date {
      return this.createdAt;
    }
  }
  