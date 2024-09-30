import { Module } from '@nestjs/common';
import { userUuidValidator } from './validators/uuid.validator';


@Module({
    providers: [userUuidValidator],
    exports: [userUuidValidator]
})
export class SharedModule {}
