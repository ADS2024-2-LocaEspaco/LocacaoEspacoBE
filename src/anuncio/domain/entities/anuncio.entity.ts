import { ComodidadeEntity } from './comodidade.entity'; // Ajuste o caminho conforme necessário

export class AnuncioEntity {
  private readonly id: string;
  private readonly title: string;
  private readonly street: string;
  private readonly bairro: string;
  private readonly cidade: string;
  private readonly cep: string;
  private readonly numero: number;
  private readonly complement?: string;
  private readonly latitude?: number;
  private readonly longitude?: number;
  private readonly description: string;
  private readonly userId: string;
  private readonly tipoImovelId: string;
  private readonly tipoEspacoId: string;
  private readonly qtdMaxHospedes: number;
  private readonly feedback: any[];  // Ajuste o tipo de feedback conforme a sua necessidade
  private readonly createdAt: Date;
  private readonly comodidades: ComodidadeEntity[]; // Novo campo adicionado


  constructor(data: {
      id: string;
      title: string;
      street: string;
      bairro: string;
      cidade: string;
      cep: string;
      numero: number;
      complement?: string;
      latitude?: number;
      longitude?: number;
      description: string;
      userId: string;
      tipoImovelId: string;
      tipoEspacoId: string;
      qtdMaxHospedes: number;
      feedback: any[];
      createdAt: Date;
  }) {
      this.id = data.id;
      this.title = data.title;
      this.street = data.street;
      this.bairro = data.bairro;
      this.cidade = data.cidade;
      this.cep = data.cep;
      this.numero = data.numero;
      this.complement = data.complement;
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.description = data.description;
      this.userId = data.userId;
      this.tipoImovelId = data.tipoImovelId;
      this.tipoEspacoId = data.tipoEspacoId;
      this.qtdMaxHospedes = data.qtdMaxHospedes;
      this.feedback = data.feedback;
      this.createdAt = data.createdAt;
  }

  get getId(): string {
      return this.id;
  }

  get getTitle(): string {
      return this.title;
  }

  get getStreet(): string {
      return this.street;
  }

  get getBairro(): string {
      return this.bairro;
  }

  get getCidade(): string {
      return this.cidade;
  }

  get getCep(): string {
      return this.cep;
  }

  get getNumero(): number {
      return this.numero;
  }

  get getComplement(): string | undefined {
      return this.complement;
  }

  get getLatitude(): number | undefined {
      return this.latitude;
  }

  get getLongitude(): number | undefined {
      return this.longitude;
  }

  get getDescription(): string {
      return this.description;
  }

  get getUserId(): string {
      return this.userId;
  }

  get getTipoImovelId(): string {
      return this.tipoImovelId;
  }

  get getTipoEspacoId(): string {
      return this.tipoEspacoId;
  }

  get getQtdMaxHospedes(): number {
      return this.qtdMaxHospedes;
  }

  get getFeedback(): any[] {
      return this.feedback;
  }

  get getCreatedAt(): Date {
      return this.createdAt;
  }
  
  get getComodidades(): ComodidadeEntity[] {
    return this.comodidades;
}
}
