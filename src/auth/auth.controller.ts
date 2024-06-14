/**
 * Controller for authentication routes which are sign in and sign up with prefix /auth
 * */

import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import {
    UserLoginSchema,
    UserLoginSchemaInterface,
    UserRegistrationSchema,
    UserRegistrationSchemaInterface,
} from './auth.schema';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UsePipes(new ValidationPipe(UserLoginSchema))
    async login(@Body() user: UserLoginSchemaInterface) {
        return await this.authService.login(user);
    }

    @Post('register')
    @UsePipes(new ValidationPipe(UserRegistrationSchema))
    async register(@Body() user: UserRegistrationSchemaInterface) {
        return this.authService.register(user);
    }
}
