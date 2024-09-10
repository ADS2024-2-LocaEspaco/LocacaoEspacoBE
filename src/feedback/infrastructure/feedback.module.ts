import { Module } from '@nestjs/common';
import { FeedbackService } from '../domain/service/feedback.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FeedbackService],
})
export class FeedbackModule {}
