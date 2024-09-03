import { Module } from "@nestjs/common";
import { UserLoginController } from "../application/controllers/user.login.controller";
import { UserService } from "./user.service";
import { GoogleStrategy } from "../application/controllers/google.strategy";

@Module({
    controllers: [UserLoginController],
    providers: [UserService, GoogleStrategy],
})

export class UserModule{}