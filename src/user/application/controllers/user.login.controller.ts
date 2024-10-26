import {
  Controller,
  Get,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/user/infrastructure/user.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedFilter } from './unauthorized.filter';

@Controller('google')
@UseFilters(UnauthorizedFilter)
export class UserLoginController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {}

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const userData = await this.userService.googleLogin(req);

    console.log(userData);
    try {
      return res.redirect(
        `http://localhost:3000?token=${userData?.user?.accessToken}`,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
