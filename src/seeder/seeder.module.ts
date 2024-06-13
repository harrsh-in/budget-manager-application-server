import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { LoggerService } from '../services/logger.service';

@Module({
    controllers: [SeederController],
    providers: [SeederService, LoggerService],
})
export class SeederModule {}
