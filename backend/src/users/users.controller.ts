import { Body, Controller, Get, Put } from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { User as UserModel } from '@prisma/client';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me(@User() user: UserModel) {
    return user;
  }

  @Put('/me')
  updateMe(@User() user: UserModel, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(user, body);
  }
}
