import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello() {
        try {
            const user = {
                id: 1,
                name: 'John Doe',
            };

            return {
                data: user,
                message: 'User details fetched successfully.',
            };
        } catch (error) {
            throw error;
        }
    }
}
