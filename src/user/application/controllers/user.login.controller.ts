import { Controller, Get, Query, Render, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { google } from 'googleapis';
import { UserService } from "src/user/infrastructure/user.service";

@Controller('google')
export class UserLoginController {

   constructor(private readonly userService: UserService) {}

   @Get()
   @UseGuards(AuthGuard('google')) 
   async googleAuth(@Req() req: Request) {}

   @Get('redirect')
   @UseGuards(AuthGuard('google'))
   googleAuthRedirect(@Req() req: Request) {
    return this.userService.googleLogin(req);
   }
}