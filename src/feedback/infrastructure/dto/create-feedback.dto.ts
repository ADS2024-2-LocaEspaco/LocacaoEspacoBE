import { User } from "@prisma/client";

export class CreateFeedbackDto {
    id:         string;
    descricao:  string;
    nota:       number;
    anuncioId:  string;
    userId:     string;
    user?:      object;
}
