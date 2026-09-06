import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { prisma } from '../../lib/prisma';
import redisClient from '../../lib/redis';
import { sendEmailWithTemplate } from '../../utils/sendEmailWithTemplate';
import type { IRegisterCandidatePayload } from './auth.interface';

const registerCandidate = async (payload: IRegisterCandidatePayload) => {
    const normalizedEmail = payload.email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
    });

    if (existingUser) {
        throw new AppError(httpStatus.CONFLICT, 'User with this email already exists!');
    };

    const hashedPassword = await bcrypt.hash(payload.password, config.bcrypt_salt_rounds);
    const otp = crypto.randomInt(100000, 1000000).toString();
    const expirationSeconds = 5 * 60; // 5 minutes

    const registrationPayload = {
        otp,
        email: normalizedEmail,
        password: hashedPassword,
        fullName: payload.fullName,
    };

    await redisClient.setEx(
        `candidate-registration:${normalizedEmail}`,
        expirationSeconds,
        JSON.stringify(registrationPayload)
    );

    await sendEmailWithTemplate(normalizedEmail, 'Email Verification OTP', 'otpEmail', {
        otp,
        expirationMinutes: 5,
    });

    return { message: 'Verification code sent to your email. Please verify to complete registration.' };
};

export const AuthService = {
    registerCandidate
};