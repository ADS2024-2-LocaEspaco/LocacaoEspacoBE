import { User } from "@prisma/client";

export class userAuthProperty {
    email: string;
    firstName: string;
    lastName: string | null;
    picture: string;
    accessToken: string;
}