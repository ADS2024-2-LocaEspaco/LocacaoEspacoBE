import { Injectable } from "@nestjs/common";

@Injectable()
export class UserProfileService {

    getUserByEmail(req: any) {
        if (!req.email) {
            return "Email não identificado"
        }

        return req.email
    }
}