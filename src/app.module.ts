import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerService } from './services/logger.service';
import { RequestLoggerMiddleware } from './middlewares/request-logger.middleware';

@Module({
    imports: [],
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
