import { Module } from "@nestjs/common";
import { UserProfileController } from "../application/controllers/user.profile.controller";
import { UserProfileService } from "../application/services/user.profile.service";
import { UserRepositoryImp } from "../infrastructure/repositories/user.repository-impl"

@Module({
    controllers: [UserProfileController],
    providers: [UserProfileService, UserRepositoryImp]
})

export class UserModule{}