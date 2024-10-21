import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FeedbackModule } from '../../feedback/infrastructure/feedback.module';
import { UserLoginController } from '../application/controllers/user.login.controller';
import { GoogleStrategy } from '../application/controllers/google.strategy';
import { UserSaveRepository } from './repositories/user.save.repository';
import { UserGetDataController } from '../application/controllers/user.getData.controller';
import { UserDataRepository } from './repositories/user.getData.repository';

@Module({
  controllers: [UserLoginController, UserGetDataController],
  providers: [
    UserService,
    GoogleStrategy,
    UserSaveRepository,
    UserDataRepository,
  ],
})
export class UserModule {}
