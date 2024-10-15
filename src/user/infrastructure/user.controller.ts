import { Controller, Get, Body, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateFeedbackDto } from '../../feedback/infrastructure/database/dto/create-feedback.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get('comentario')
  // async getComentarioUser(@Body('id') data: any): Promise<CreateFeedbackDto[]> {
  //   console.log(data)
  //   return this.userService.getComentarioUser(data);
  // }

  @Get('data-anfitriao')
  async getDataAnfitriao(@Body('id') data: any): Promise<any> {
    console.log(data)
    data = await this.userService.getDataAnfitriao(data);
    return data
  }

  
}
