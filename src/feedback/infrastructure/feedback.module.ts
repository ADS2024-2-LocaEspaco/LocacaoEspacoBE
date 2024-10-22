import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { feedbackRepository } from './repositories/Feedback.repositories';

@Module({
  imports: [],
  controllers: [],
  providers: [FeedbackService, feedbackRepository],
})
export class FeedbackModule {}
