import { Controller, Get, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { FeedbackEntity } from 'src/feedback/domain/entities/feedback.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getHello(@Query() data: any): Promise<any> {
    console.log(data)
    return this.userService.getComentarioUser(data.id);
  }
}
