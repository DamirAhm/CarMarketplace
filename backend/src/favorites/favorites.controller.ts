import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthorizedGuard } from '../guards/authorized.guard';
import { User } from '../decorators/user.decorator';
import { User as UserModel } from '@prisma/client';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(AuthorizedGuard)
  @Post(':advertisementId')
  addToFavorites(
    @User() user: UserModel,
    @Param('advertisementId') advertisementId: string,
  ) {
    return this.favoritesService.addToFavorites(user, advertisementId);
  }

  @UseGuards(AuthorizedGuard)
  @Delete(':advertisementId')
  removeFromFavorites(
    @User() user: UserModel,
    @Param('advertisementId') advertisementId: string,
  ) {
    return this.favoritesService.removeFromFavorites(user, advertisementId);
  }
}
