import {
    BadRequestException,
    Injectable,
    Logger,
    PipeTransform,
} from '@nestjs/common';
import { Schema, ZodError } from 'zod';

@Injectable()
export class ValidationPipe<T> implements PipeTransform {
    private readonly logger = new Logger(ValidationPipe.name);

    constructor(private schema: Schema<T>) {}

    transform(value: any) {
        try {
            return this.schema.parse(value);
        } catch (error) {
            if (error instanceof ZodError) {
                const validationErrors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));

                this.logger.verbose(validationErrors);

                throw new BadRequestException({
                    message: error.errors[0].message,
                });
            }

            throw error;
        }
    }
}
