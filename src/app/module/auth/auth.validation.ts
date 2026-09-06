import { z } from 'zod';

export const registerCandidateSchema = z.object({
    body: z.object({
        email: z.string({ message: 'Email is required' }).email('Invalid email address format'),
        password: z
            .string({ message: 'Password is required' })
            .min(8, 'Password must be at least 8 characters long')
            .max(32, 'Password cannot exceed 32 characters')
            .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
            .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
            .regex(/[0-9]/, 'Password must contain at least 1 number')
            .regex(/[^A-Za-z0-9]/, 'Password must contain at least 1 special character'),
        fullName: z
            .string({ message: 'Full name is required' })
            .min(3, 'Full name must be at least 3 characters long')
            .max(50, 'Full name cannot exceed 50 characters')
    })
});

export const AuthValidation = {
    registerCandidateSchema
};