import { Controller, Get, Body, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  

  // @Get('data-anfitriao')
  // async getDataAnfitriao(@Body('id') data: any): Promise<any> {
  //   console.log(data)
  //   data = await this.userService.getDataAnfitriao(data);
  //   return data
  // }

  
}
