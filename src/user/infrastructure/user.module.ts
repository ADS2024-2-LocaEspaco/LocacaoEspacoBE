import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FeedbackModule } from '../../feedback/infrastructure/feedback.module';
import { UserLoginController } from '../application/controllers/user.login.controller';
import { GoogleStrategy } from '../application/controllers/google.strategy';
import { UserSaveRepository } from './repositories/user.save.repository';
import { UserRepository } from './repositories/user.repositories';

@Module({
  imports: [FeedbackModule],
  controllers: [UserController, UserLoginController],
  providers: [ GoogleStrategy, UserSaveRepository, UserRepository, UserService],

})
export class UserModule {}
