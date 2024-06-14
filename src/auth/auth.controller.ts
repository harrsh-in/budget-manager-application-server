/**
 * Controller for authentication routes which are sign in and sign up with prefix /auth
 * */

import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import {
    SignInSchema,
    SignInSchemaInterface,
    SignUpSchema,
    SignUpSchemaInterface,
} from './auth.schema';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    @UsePipes(new ValidationPipe(SignInSchema))
    async signIn(@Body() user: SignInSchemaInterface) {
        return await this.authService.signIn(user);
    }

    @Post('sign-up')
    @UsePipes(new ValidationPipe(SignUpSchema))
    async signUp(@Body() user: SignUpSchemaInterface) {
        return this.authService.signUp(user);
    }
}
