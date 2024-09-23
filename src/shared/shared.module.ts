import { Module } from '@nestjs/common';
import { ValidateUuid } from './validators/uuid.validator';
import { validate } from 'uuid';

@Module({
    providers: [ValidateUuid],
    exports: [ValidateUuid]
})
export class SharedModule {}
