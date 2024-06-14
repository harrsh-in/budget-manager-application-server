/**
 * Zod schema for authentication service based on Prisma inputs
 * */

import { object, string, z } from 'zod';

export const SignInSchema = object({
    email: string({
        message: 'Please enter email address.',
        required_error: 'Please enter email address.',
        invalid_type_error: 'Please enter a valid email address.',
    }).email('Please enter a valid email address.'),
    password: string({
        message: 'Please enter password.',
        required_error: 'Please enter password.',
        invalid_type_error: 'Please enter a valid password.',
    }).min(1, 'Password is required.'),
});
export type SignInSchemaInterface = z.infer<typeof SignInSchema>;

export const SignUpSchema = object({
    username: string({
        message: 'Username is required.',
        required_error: 'Username is required.',
        invalid_type_error: 'Please enter a valid username.',
    }).min(1, 'Username is required.'),
    name: string({
        message: 'Name is required.',
        required_error: 'Name is required.',
        invalid_type_error: 'Please enter a valid name.',
    }).min(1, 'Name is required.'),
    contactNumber: string({
        message: 'Contact number is required.',
        required_error: 'Contact number is required.',
        invalid_type_error: 'Please enter a valid contact number.',
    }).min(1, 'Contact number is required.'),
    email: string({
        message: 'Please enter email address.',
        required_error: 'Please enter email address.',
        invalid_type_error: 'Please enter a valid email address.',
    }).email('Please enter a valid email address.'),
    password: string({
        message: 'Please enter password.',
        required_error: 'Please enter password.',
        invalid_type_error: 'Please enter a valid password.',
    }).min(1, 'Password is required.'),
});
export type SignUpSchemaInterface = z.infer<typeof SignUpSchema>;
