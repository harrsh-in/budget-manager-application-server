import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { encryptPassword } from '../utils/password';
import { Prisma } from '@prisma/client';

@Injectable()
export class SeederService {
    private readonly logger = new Logger(SeederService.name);

    constructor(private prisma: PrismaService) {}

    async seed() {
        const seederResponseData = await Promise.allSettled([this.seedUsers()]);

        for (const response of seederResponseData) {
            if (response.status === 'rejected') {
                this.logger.error(response.reason);
            }
        }

        this.logger.log('Seeding completed');
    }

    async seedUsers() {
        await this.prisma.users.deleteMany();

        const user: Prisma.usersCreateInput = {
            name: 'John Doe',
            email: 'john@yahoo.com',
            user_role: 'user',
            contact_number: '+911234567890',
            username: 'john_doe',
            password: await encryptPassword('john@123'),
        };
        await this.prisma.users.create({
            data: user,
        });
    }
}
