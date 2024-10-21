import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/user/infrastructure/user.service';

@Controller('user')
export class UserGetDataController {
  constructor(private readonly userService: UserService) {}
  @Get('/:token')
  async getUserData(@Param('token') token: string, @Res() res: Response) {
    console.log(token);
    const userData = await this.userService.getUserData(token);

    res.status(200).json(userData);
  }
}
