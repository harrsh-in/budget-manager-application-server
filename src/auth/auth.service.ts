/**
 * Service for sign-in, sign-up, forgot password, and reset password
 * */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { comparePassword, encryptPassword } from '../utils/password';
import { JwtService } from '@nestjs/jwt';
import { SignInSchemaInterface, SignUpSchemaInterface } from './auth.schema';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async signIn(body: SignInSchemaInterface) {
        const { password, email } = body;
        const user = await this.prisma.users.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordMatch = await comparePassword(password, user.password);
        if (!isPasswordMatch) {
            throw new Error('Invalid password');
        }

        const payload = {
            sub: user.user_id,
            email: user.email,
            user_role: user.user_role,
        };

        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '1d',
        });
        return {
            access_token: token,
        };
    }

    async signUp(user: SignUpSchemaInterface) {
        const userExists = await this.prisma.users.findUnique({
            where: {
                email: user.email,
            },
        });
        if (userExists) {
            throw new Error('An account already exists with this email.');
        }

        user.password = await encryptPassword(user.password);
        const { password, email, user_name, name, contact_number } = user;
        await this.prisma.users.create({
            data: {
                email,
                name,
                password,
                contact_number,
                user_role: 'user',
                username: user_name,
            },
        });

        return {
            message: 'You are successfully registered.',
        };
    }
}
