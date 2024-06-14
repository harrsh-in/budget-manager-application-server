/**
 * JWT auth middleware to check for jet token in cookies.
 * */

import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies['jwt'];
        if (!token) {
            throw new UnauthorizedException('You are not logged in.');
        }

        try {
            const payload = this.jwtService.verify(token);
            req.body['user_data'] = payload;
            next();
        } catch (error) {
            throw new UnauthorizedException(
                'Your session has expired. Please login again.',
            );
        }
    }
}
