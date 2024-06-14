/**
 * Interceptor to handle the response from the server
 * This interceptor is used to log the response from the server
 * and to handle the response in a common format
 * */

import {
    CallHandler,
    ExecutionContext,
    HttpStatus,
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
                const { meta, message, access_token, ...responseData } =
                    data ?? {};
                const response = context.switchToHttp().getResponse();

                if (access_token) {
                    response.cookie('Authorization', access_token, {
                        httpOnly: true,
                    });
                }

                response.status(HttpStatus.OK);
                return {
                    data: responseData,
                    meta,
                    statusCode: 200,
                    status: true,
                    message,
                };
            }),
        );
    }
}
