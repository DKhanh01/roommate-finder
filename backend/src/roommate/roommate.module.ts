import { Module } from '@nestjs/common';
import { RoommateController } from './roommate.controller';
import { RoommateService } from './roommate.service';

@Module({
  controllers: [RoommateController],
  providers: [RoommateService]
})
export class RoommateModule {}
