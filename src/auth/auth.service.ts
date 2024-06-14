/**
 * Service for sign-in, sign-up, forgot password, and reset password
 * */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { comparePassword, encryptPassword } from '../utils/password';
import { JwtService } from '@nestjs/jwt';
import {
    UserLoginSchemaInterface,
    UserRegistrationSchemaInterface,
} from './auth.schema';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async login(body: UserLoginSchemaInterface) {
        const { password, email } = body;
        const user = await this.prisma.users.findUnique({
            where: {
                email,
            },
            select: {
                user_id: true,
                email: true,
                password: true,
                user_role: true,
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

    async verifyUserByToken(token: string) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.prisma.users.findUnique({
                where: {
                    user_id: payload.sub,
                },
                select: {
                    user_id: true,
                    email: true,
                    user_role: true,
                },
            });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (e) {
            throw new Error('Invalid token');
        }
    }

    async register(user: UserRegistrationSchemaInterface) {
        const userExists = await this.prisma.users.findUnique({
            where: {
                email: user.email,
            },
            select: {
                user_id: true,
            },
        });
        if (userExists) {
            throw new Error('An account already exists with this email.');
        }

        user.password = await encryptPassword(user.password);
        const { password, email, username, name, contactNumber } = user;
        await this.prisma.users.create({
            data: {
                email,
                name,
                password,
                username,
                contact_number: contactNumber,
                user_role: 'user',
            },
        });

        return {
            message: 'You are successfully registered.',
        };
    }
}
