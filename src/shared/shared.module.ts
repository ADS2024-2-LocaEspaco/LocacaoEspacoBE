import { Module } from '@nestjs/common';
import { userUuidValidator } from './validators/Anuncio.validator';

@Module({
    providers: [],
    exports: []
})
export class SharedModule {}
