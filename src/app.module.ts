import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestLoggerMiddleware } from './middlewares/request-logger.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { SeederModule } from './seeder/seeder.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthMiddleware } from './middlewares/jwt-auth.middleware';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
            }),
            inject: [ConfigService],
        }),
        PrismaModule,
        SeederModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    /**
     * Configure the global middleware
     * @param consumer
     */
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RequestLoggerMiddleware, JwtAuthMiddleware)
            .forRoutes('*');
    }
}
