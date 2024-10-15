export class userProfile {
    firstName: string;
    lastName?: string | null;
    picture: string;
    email: string;
    cpf: string  | null;
    phone: bigint | null;
    agency: bigint | null;
    account: string | null;
    bankName: string | undefined;
    bankCode: bigint | undefined;
    state: string;
    city: string;
    address: string;
    cep: string;
}