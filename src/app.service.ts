import { Injectable } from '@nestjs/common';
import { LoggerService } from './services/logger.service';

/**
 * Write the business logic here
 * This service is used by the controller to get the response
 */
@Injectable()
export class AppService {
    /**
     * Constructor to inject the logger service
     * @param logger
     */
    constructor(private readonly logger: LoggerService) {}

    /**
     * Get the hello message
     * @returns Hello message
     */
    getHello(): string {
        this.logger.log('Hello World!');
        return 'Hello World!';
    }
}
