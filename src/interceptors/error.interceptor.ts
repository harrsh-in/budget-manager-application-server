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
     * @param _
     * @param next
     */
    intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError(err => {
                const isHttpException = err instanceof HttpException;
                const status = isHttpException ? err.getStatus() : 400;
                const errorMessage = err.message ?? 'Internal Server Error';

                const response = {
                    data: {},
                    statusCode: status,
                    message: errorMessage,
                };

                return throwError(() => new HttpException(response, status));
            }),
        );
    }
}
