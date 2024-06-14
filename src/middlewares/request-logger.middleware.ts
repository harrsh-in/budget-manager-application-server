import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * Request logger middleware to log the request details
 */
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(RequestLoggerMiddleware.name);

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl } = req;
        const startTime = Date.now();

        res.on('finish', () => {
            const endTime = Date.now();

            this.logger.log(
                `${method} ${originalUrl} - ${res.statusCode} - Response time is ${endTime - startTime}ms - ${res.statusMessage} - ${res.get('Content-Length') || 0} bytes sent`,
            );
        });
        next();
    }
}
