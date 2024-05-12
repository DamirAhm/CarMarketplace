import { Module } from '@nestjs/common';
import { AdvertismentsController } from './advertisments.controller';
import { AdvertismentsService } from './advertisments.service';

@Module({
  controllers: [AdvertismentsController],
  providers: [AdvertismentsService],
})
export class AdvertismentsModule {}
