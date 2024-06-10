import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { CurrentUserMiddleware } from './middlewares/currentUser.middleware';
import { AdvertismentsModule } from './advertisments/advertisments.module';
import { ImagesModule } from './images/images.module';
import { FeedbackModule } from './feedback/feedback.module';
import { CarsModule } from './cars/cars.module';
import { FavoritesModule } from './favorites/favorites.module';
import { MessagesModule } from './messages/messages.module';
import { ChatsGateway } from './chats/chats.gateway';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '24h',
      },
    }),
    UsersModule,
    AdvertismentsModule,
    ImagesModule,
    FeedbackModule,
    CarsModule,
    FavoritesModule,
    MessagesModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [ChatsGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
