import { Controller, Get } from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UsersController {
  @Get('/me')
  me(@User() user: UserModel) {
    return user;
  }
}
