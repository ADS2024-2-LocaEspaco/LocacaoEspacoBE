import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from '../domain/services/property.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
