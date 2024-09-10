import { Body, Controller, Get, Put, Query, Render, Req, Res, UseGuards } from "@nestjs/common";
import { UserProfileService } from "../services/user.profile.service";
import { UserEntity } from "src/user/domain/entities/user.entity";

@Controller('profile')
export class UserProfileController {

    constructor(private readonly userProfileService: UserProfileService) {}

    @Get()
    getUserByEmail(@Body() email:string):string {
        return this.userProfileService.getUserByEmail(email);
    }
    
    @Put()
    updateUsername(@Body() req: Request):Promise<string> {
        return this.userProfileService.updateUsername(req);
    }

    @Put("/bank")
    updateBankInformation(@Body() req: Request):Promise<string>{
        return this.userProfileService.updateBankInformation(req);
    }

    @Put("/image")
    updateProfileImage(@Body() req: Request): Promise<string>{
        return this.userProfileService.updateProfileImage(req)
    }
}