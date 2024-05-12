import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
import { AUTH_COOKIE_NAME } from '../auth/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, _: Response, next: () => void) {
    const authCookie = req.cookies[AUTH_COOKIE_NAME];

    if (!authCookie) {
      next?.();
      return;
    }

    const { email } = await this.jwtService.verifyAsync(authCookie);

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    req['user'] = user;
    next?.();
  }
}
