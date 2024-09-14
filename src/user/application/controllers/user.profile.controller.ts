import { Body, Controller, Get, Head, Param, Put, Query, Render, Req, Res, UseGuards } from "@nestjs/common";
import { UserProfileService } from "../services/user.profile.service";
import { UserEntity } from "src/user/domain/entities/user.entity";

@Controller('profile')
export class UserProfileController {

    constructor(private readonly userProfileService: UserProfileService) {}

    
    @Get(":id")
    getUserById(@Param() id: string): string {
        return this.userProfileService.getUserById(id);
    }

    @Get("/email/:id")
    getUserByEmail(@Body() email:string):string {
        return this.userProfileService.getUserByEmail(email);
    }
    
    @Put()
    async updateUsername(@Body() req: Request): Promise<{message: string, success: boolean}> {
        return await this.userProfileService.updateUsername(req);
    }

    @Put("/bank")
    async updateBankInformation(@Body() req: Request): Promise<{message: string, success: boolean}>{
        return await this.userProfileService.updateBankInformation(req);
    }

    @Put("/image")
    async updateProfileImage(@Body() req: Request): Promise<{message: string, success: boolean}>{
        return await this.userProfileService.updateProfileImage(req)
    }

    @Put("/account")
    async updateAccountInformation(@Body() req: Request): Promise<{message: string, success: boolean}>{
        return await this.userProfileService.updateAccountInformation(req)
    }

    @Put("/contact")
    async updateContactInformation(@Body() req: Request): Promise<{message: string, success: boolean}>{
        return await this.userProfileService.updateContactInformation(req)
    }
}