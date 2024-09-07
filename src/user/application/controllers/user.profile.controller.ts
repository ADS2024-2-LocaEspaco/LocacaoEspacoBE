import { Body, Controller, Get, Query, Render, Req, Res, UseGuards } from "@nestjs/common";
import { UserProfileService } from "../services/user.profile.service";
import { UserEntity } from "src/user/domain/entities/user.entity";

@Controller('profile')
export class UserProfileController {

    constructor(private readonly userProfileService: UserProfileService) {}

    @Get()
    getUserByEmail(@Body() email:string):string {
        return this.userProfileService.getUserByEmail(email);
    }

}