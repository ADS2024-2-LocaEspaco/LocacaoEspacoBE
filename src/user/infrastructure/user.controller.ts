import { Controller, Get, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { FeedbackEntity } from 'src/feedback/domain/entities/feedback.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(@Query() data: any) {
    console.log(data)
    return this.userService.getHello();
  }
}
