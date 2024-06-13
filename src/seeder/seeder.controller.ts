import { Controller, Post } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seeder')
export class SeederController {
    constructor(private readonly seederService: SeederService) {}

    @Post()
    async seed() {
        await this.seederService.seed();

        return {
            message: 'Seeding completed',
        };
    }

    @Post('/users')
    async seedUsers() {
        await this.seederService.seedUsers();

        return {
            message: 'User seeding completed',
        };
    }
}