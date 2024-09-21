import { Body, Controller, Get, Delete, Head, Param, Put, Query, Render, Req, Res, UseGuards } from "@nestjs/common";
import { UserProfileService } from "../services/user.profile.service";
import { UserEntity } from "src/user/domain/entities/user.entity";

@Controller('profile')
export class UserProfileController {

    constructor(private readonly userProfileService: UserProfileService) {}

    
    @Get(":id")
    async getUserById(@Param() id: string): Promise<any>  {
        return await this.userProfileService.getUserById(id);
    }

    @Get("/email/:email")
    async getUserByEmail(@Param() email:string): Promise<any> {
        return await this.userProfileService.getUserByEmail(email);
    }

    @Get("/classification/:idUser")
    async getUserClassification(@Param() idUser:string): Promise<any> {
        return await this.userProfileService.getUserClassification(idUser)
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

    @Delete(":id")
    async deleteUser(@Param() id: string): Promise<string>  {
        return await this.userProfileService.deleteUser(id);
    }
}