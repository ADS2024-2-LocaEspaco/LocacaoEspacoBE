import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor() {
        super({
            clientID: "919982927969-77vr4f9nv7p19m4sdd0013k0fu99mvlf.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/google/redirect",
            scope: ['email', 'profile'],
        });
    }

    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        };

        console.log(user);

        done(null, user);
    }
} 