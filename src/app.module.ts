import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerService } from './logger/logger.service';
import { RequestLoggerMiddleware } from './middlewares/request-logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { SeederModule } from './seeder/seeder.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
        }),
        LoggerModule,
        PrismaModule,
        SeederModule,
        AuthModule,
    ],
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
