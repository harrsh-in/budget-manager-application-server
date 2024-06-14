/**
 * Create a filter to catch all not found routes that is compatible with useGlobalFilters
 * */

import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * Filter to catch all not found routes
 */
@Catch(NotFoundException)
export class NotFoundInterceptor implements ExceptionFilter {
    /**
     * Catch all not found routes
     * @param _
     * @param host
     */
    catch(_: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(404).json({
            data: {},
            statusCode: 404,
            status: false,
            message: 'Not Found',
        });
    }
}
