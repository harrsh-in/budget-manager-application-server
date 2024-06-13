import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerService } from './common/services/logger.service';
import { RequestLoggerMiddleware } from './common/middlewares/request-logger.middleware';
import { PrismaModule } from './common/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [AppController],
    providers: [AppService, LoggerService],
})
export class AppModule implements NestModule {
    /**
     * Configure the global middleware
     * @param consumer
     */
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    }
}
