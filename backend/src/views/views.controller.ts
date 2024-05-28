import { Controller, Param, Post } from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { ViewsService } from './views.service';
import { User as UserModel } from '@prisma/client';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Post('/:advertisementId')
  addView(
    @User() user: UserModel,
    @Param('advertisementId') advertisementId: string,
  ) {
    return this.viewsService.addView(user, advertisementId);
  }
}
