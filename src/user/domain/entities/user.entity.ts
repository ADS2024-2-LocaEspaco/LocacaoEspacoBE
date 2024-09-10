export class UserEntity {
  private readonly id: string;
  private firstName: string;
  private lastName: string;
  private readonly email: string;
  private cpf: string;
  private accessToken: string;
  private phone: string;
  private address: string;
  private state: string;
  private city: string;
  private cep: string;
  private picture: string;
  private roleId: number;
  private ads: Array<any>;

  //autenticação realizada com Google -> user será inicialmente criado com email e firstName
  constructor(email: string, firstName: string, lastName: string, picture: string, accessToken: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.picture = picture;
    this.accessToken = accessToken;
  }

  get getId(): string {
    return this.id;
  }

  get getFirstName(): string {
    return this.firstName;
  }

  get getLastName(): string {
    return this.lastName;
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

  get getState(): string {
    return this.state;
  }

  get getCity(): string {
    return this.city;
  }

  get getCep(): string {
    return this.cep;
  }

  get getPicture(): string {
    return this.picture;
  }

  get getRoleId(): number {
    return this.roleId;
  }

  get getAds(): Array<any> {
    return this.ads;
  }

  get getAccessToken(): string {
    return this.accessToken;
  }
  
  set setCpf(cpf: string) {
    this.cpf = cpf;
  }

  set setPhone(phone: string) {
    this.phone = phone;
  }

  set setAddress(address: string) {
    this.address = address;
  }

  set setState(state: string) {
    this.state = state;
  }

  set setCity(city: string) {
    this.city = city;
  }

  set setCep(cep: string) {
    this.cep = cep;
  }

  set setPicture(picture: string) {
    this.picture = picture;
  }
}
