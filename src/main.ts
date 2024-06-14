import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NotFoundInterceptor } from './interceptors/not-found.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(helmet());
    app.enableCors();
    app.use(cookieParser());

    // Set global prefix to all routes as /api/v1
    app.setGlobalPrefix('api/v1');

    /**
     * Register the global interceptors
     * */
    app.useGlobalInterceptors(
        new ResponseInterceptor(),
        new ErrorInterceptor(),
    );

    // Set filter to handle all 404 routes
    app.useGlobalFilters(new NotFoundInterceptor());

    await app.listen(3000);
}

void bootstrap();
