export class UserEntity {
  private readonly id: string;
  private username: string;
  private fullName: string;
  private email: string;
  private cpf: string;
  private phone: string;
  private address: string;
  private state: string;
  private city: string;
  private cep: string;
  private photo: string;
  private roleId: number;
  private ads: Array<any>;

  //autenticação realizada com Google -> user será inicialmente criado com email e username
  constructor(id: string, email: string, username: string) {
    this.id = id;
    this.email = email;
    this.username = username;
  }

  get getId(): string {
    return this.id;
  }

  get getUsername(): string {
    return this.username;
  }

  get getFullname(): string {
    return this.fullName;
  }

  get getEmail(): string {
    return this.email;
  }

  get getCpf(): string {
    return this.cpf;
  }

  get getPhone(): string {
    return this.phone;
  }

  get getAddress(): string {
    return this.address;
  }

  get getSteate(): string {
    return this.state;
  }

  get getCity(): string {
    return this.city;
  }

  get getCep(): string {
    return this.cep;
  }

  get getPhoto(): string {
    return this.photo;
  }

  get getRoleId(): number {
    return this.roleId;
  }

  get getAds(): Array<any> {
    return this.ads;
  }
}
