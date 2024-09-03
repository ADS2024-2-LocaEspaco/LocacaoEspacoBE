import { Module } from '@nestjs/common';
import { ValidateUuid } from './validators/uuid.validator';

@Module({
    providers: [ValidateUuid],
    exports: [ValidateUuid]
})
export class SharedModule {}
