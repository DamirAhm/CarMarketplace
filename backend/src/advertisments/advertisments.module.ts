import { Module } from '@nestjs/common';
import { AdvertismentsController } from './advertisments.controller';
import { AdvertismentsService } from './advertisments.service';
import { ViewsModule } from '../views/views.module';

@Module({
  imports: [ViewsModule],
  controllers: [AdvertismentsController],
  providers: [AdvertismentsService],
})
export class AdvertismentsModule {}
