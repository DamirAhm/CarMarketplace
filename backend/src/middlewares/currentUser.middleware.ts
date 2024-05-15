import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request, Response } from 'express';
import { AUTH_COOKIE_NAME } from '../auth/constants';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    const authCookie = req.cookies[AUTH_COOKIE_NAME];

    if (!authCookie) {
      next?.();
      return;
    }

    const { email } = await this.jwtService.verifyAsync(authCookie);

    req['user'] = await this.prismaService.user
      .findUnique({
        where: {
          email,
        },
        include: {
          avatar: true,
        },
      })
      .then(({ avatar, ...rest }) => ({ ...rest, avatar: avatar[0]?.id }));

    if (!req['user']) {
      this.authService.logout(res);
    }

    next?.();
  }
}
