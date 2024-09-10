import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FeedbackModule } from '../../feedback/infrastructure/feedback.module';

@Module({
  imports: [FeedbackModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
