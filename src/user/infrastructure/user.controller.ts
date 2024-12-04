import { Controller, Get, Body, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@Get('comentario')
  // async getComentarioUser(@Body('id') data: any): Promise<CreateFeedbackDto[]> {
  //   console.log(data)
  //   return this.userService.getComentarioUser(data);
  // }

  @Get('data-anfitriao/:id')
  async getDataAnfitriao(@Param('id') id: number): Promise<any> {
    return await this.userService.getDataAnfitriao(+id);
  }

  
}
