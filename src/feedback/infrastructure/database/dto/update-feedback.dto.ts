import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedbackDto } from './create-feedback.dto';

export class UpdateuserDto extends PartialType(CreateFeedbackDto) {}
