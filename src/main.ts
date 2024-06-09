import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    /**
     * Register the global interceptors
     * */
    app.useGlobalInterceptors(
        new ResponseInterceptor(),
        new ErrorInterceptor(),
    );
    await app.listen(3000);
}
bootstrap();
