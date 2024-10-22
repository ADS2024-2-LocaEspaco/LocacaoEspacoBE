import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ValidateUuid } from './validators/uuid.validator';
import { validate } from 'uuid';

@Module({
  providers: [ValidateUuid,PrismaService],
  exports: [ValidateUuid,PrismaService]
})
export class SharedModule {}
