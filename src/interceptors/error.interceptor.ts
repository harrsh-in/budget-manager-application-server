// src/interceptors/error.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Error interceptor to handle the error response from the server
 */
@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    /**
     * Intercept the error response from the server
     * Log the error and handle the error in a common format
     * @param context
     * @param next
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError(error => {
                return throwError(
                    () =>
                        new HttpException(
                            {
                                statusCode:
                                    error instanceof HttpException
                                        ? error.getStatus()
                                        : 500,
                                message:
                                    error.message ?? 'Internal server error',
                            },
                            error instanceof HttpException
                                ? error.getStatus()
                                : 500,
                        ),
                );
            }),
        );
    }
}
