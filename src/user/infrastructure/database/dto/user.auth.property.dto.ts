import { User } from "@prisma/client";

export class userAuthProperty {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    accessToken: string;
}