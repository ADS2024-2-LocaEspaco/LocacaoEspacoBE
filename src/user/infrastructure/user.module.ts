import { Module } from '@nestjs/common';
import { UserLoginController } from '../application/controllers/user.login.controller';
import { UserService } from './user.service';
import { GoogleStrategy } from '../application/controllers/google.strategy';
import { UserSaveRepository } from './repositories/user.save.repository';

@Module({
  controllers: [UserLoginController],
  providers: [UserService, GoogleStrategy, UserSaveRepository],
})
export class UserModule {}
