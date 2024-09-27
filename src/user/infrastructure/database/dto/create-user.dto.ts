import { User } from "@prisma/client";

export class CreateUserDto{
    id:       string;
    firstName: string;
    lastName?: string | null;
    picture:    string;
}
