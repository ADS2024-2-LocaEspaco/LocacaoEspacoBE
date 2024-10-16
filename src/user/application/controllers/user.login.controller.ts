import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/infrastructure/user.service';
import { Request, Response } from 'express';
import { use } from 'passport';

@Controller('google')
export class UserLoginController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    try {
      const userData = await this.userService.googleLogin(req);

      res.redirect(
        `http://localhost:3000?token=${userData?.user?.accessToken}`,
      );
    } catch (error) {
      console.log(error);
      res.status(500).send('Usuário não informado');
    }
  }
}
