import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserProfileController } from "../application/controllers/user.profile.controller";
import { UserProfileService } from "../application/services/user.profile.service";

@Module({
    controllers: [UserProfileController],
    providers: [UserProfileService]
})

export class UserModule{}