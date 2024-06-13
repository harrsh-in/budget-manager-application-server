/**
 * Interceptor to handle the response from the server
 * This interceptor is used to log the response from the server
 * and to handle the response in a common format
 * */

import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Response interceptor to handle the response from the server
 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    /**
     * Intercept the response from the server
     * Log the response and handle the response in a common format
     * @param context
     * @param next
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => {
                /**
                 * Check if response has meta field.
                 * If it has, then remove meta from data and return it as an individual field.
                 * */
                const { data: responseData, meta, message } = data;

                return {
                    data: responseData,
                    meta,
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    message,
                };
            }),
        );
    }
}
