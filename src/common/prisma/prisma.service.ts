import {
    Injectable,
    Logger,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    private readonly logger = new Logger(PrismaService.name);

    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log('Database connected successfully.');
        } catch (error) {
            this.logger.error('Failed to connect to the database.', error);
            throw new Error('Failed to connect to the database.');
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
