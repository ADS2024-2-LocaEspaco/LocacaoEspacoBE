import { Controller, Get, Body, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { FeedbackEntity } from 'src/feedback/domain/entities/feedback.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getHello(@Body('id') data: any): Promise<any> {
    console.log(data)
    return this.userService.getComentarioUser(data);
  }

  @Get('data-anfitriao')
  async getDataAnfitriao(@Body('id') data: any): Promise<any> {
    data = await this.userService.getDataAnfitriao(data);
    return data
  }

  
}
