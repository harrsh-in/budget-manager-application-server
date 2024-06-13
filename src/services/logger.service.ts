import {
    Injectable,
    LoggerService as NestJsLoggerService,
} from '@nestjs/common';
import winston from 'winston';

/**
 * Custom logger service to log messages
 */
@Injectable()
export class LoggerService implements NestJsLoggerService {
    private logger = winston.createLogger();

    /**
     * Constructor to add console transport to the logger
     */
    constructor() {
        // Add console transport to the logger
        this.logger.add(
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss',
                    }),
                    winston.format.colorize(),
                    winston.format.printf(
                        info =>
                            `${info.timestamp} ${info.level}: ${info.message}`,
                    ),
                ),
            }),
        );
    }

    /**
     * Log the message
     * @param message
     */
    log(message: string) {
        this.logger.log('info', message);
    }

    /**
     * Log the error message
     * @param message
     * @param trace
     */
    error(message: string, trace?: string) {
        this.logger.log('error', message, {
            trace,
        });
    }

    /**
     * Log the warning message
     * @param message
     */
    warn(message: string) {
        this.logger.log('warn', message);
    }

    /**
     * Log the debug message
     * @param message
     */
    debug(message: string) {
        this.logger.log('debug', message);
    }

    /**
     * Log the verbose message
     * @param message
     */
    verbose(message: string) {
        this.logger.log('verbose', message);
    }
}
