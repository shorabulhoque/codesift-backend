import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { prisma } from '../../lib/prisma';
import redisClient from '../../lib/redis';
import { sendEmailWithTemplate } from '../../utils/sendEmailWithTemplate';
import type { IRegisterCandidatePayload, IRegisterRecruiterPayload, IVerifyEmailPayload } from './auth.interface';

const registerCandidate = async (payload: IRegisterCandidatePayload) => {
    const normalizedEmail = payload.email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
    });

    if (existingUser) {
        throw new AppError(httpStatus.CONFLICT, 'User with this email already exists!');
    }

    const hashedPassword = await bcrypt.hash(payload.password, config.bcrypt_salt_rounds);
    const otp = crypto.randomInt(100000, 1000000).toString();
    const expirationSeconds = 5 * 60;

    const registrationPayload = {
        otp,
        email: normalizedEmail,
        password: hashedPassword,
        role: 'CANDIDATE',
        fullName: payload.fullName,
    };

    await redisClient.setEx(
        `user-registration:${normalizedEmail}`,
        expirationSeconds,
        JSON.stringify(registrationPayload)
    );

    await sendEmailWithTemplate(normalizedEmail, 'Email Verification OTP', 'otpEmail', {
        otp,
        expirationMinutes: 5,
    });

    return { message: 'Verification code sent to your email. Please verify to complete registration.' };
};

const registerRecruiter = async (payload: IRegisterRecruiterPayload) => {
    const normalizedEmail = payload.email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
    });

    if (existingUser) {
        throw new AppError(httpStatus.CONFLICT, 'User with this email already exists!');
    }

    const hashedPassword = await bcrypt.hash(payload.password, config.bcrypt_salt_rounds);
    const otp = crypto.randomInt(100000, 1000000).toString();
    const expirationSeconds = 5 * 60;

    const registrationPayload = {
        otp,
        email: normalizedEmail,
        password: hashedPassword,
        role: 'RECRUITER',
        fullName: payload.fullName,
        companyName: payload.companyName,
        businessRegistrationNo: payload.businessRegistrationNo,
    };

    await redisClient.setEx(
        `user-registration:${normalizedEmail}`,
        expirationSeconds,
        JSON.stringify(registrationPayload)
    );

    await sendEmailWithTemplate(normalizedEmail, 'Email Verification OTP', 'otpEmail', {
        otp,
        expirationMinutes: 5,
    });

    return { message: 'Verification code sent to your email. Please verify to complete registration.' };
};

const verifyEmail = async (payload: IVerifyEmailPayload) => {
    const normalizedEmail = payload.email.trim().toLowerCase();
    const stagingKey = `user-registration:${normalizedEmail}`;

    const redisData = await redisClient.get(stagingKey);

    if (!redisData) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'OTP has expired or registration session is invalid.'
        );
    }

    const userData = JSON.parse(redisData);

    if (userData.otp !== payload.otp) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid OTP code.');
    }

    const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                email: userData.email,
                password: userData.password,
                role: userData.role,
                status: 'ACTIVE',
                isEmailVerified: true,
            },
            select: {
                id: true,
                email: true,
                role: true,
                status: true,
                isEmailVerified: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        let profile = null;

        if (userData.role === 'CANDIDATE') {
            profile = await tx.candidateProfile.create({
                data: {
                    userId: user.id,
                    fullName: userData.fullName,
                },
            });
        } else if (userData.role === 'RECRUITER') {
            profile = await tx.recruiterProfile.create({
                data: {
                    userId: user.id,
                    fullName: userData.fullName,
                    companyName: userData.companyName,
                    businessRegistrationNo: userData.businessRegistrationNo,
                    verificationStatus: 'PENDING',
                },
            });
        }

        return { user, profile };
    });

    await redisClient.del(stagingKey);

    if (userData.role === 'CANDIDATE') {
        await sendEmailWithTemplate(
            userData.email,
            'Welcome to CodeShift!',
            'candidateWelcomeEmail',
            { fullName: userData.fullName }
        );
    } else if (userData.role === 'RECRUITER') {
        await sendEmailWithTemplate(
            userData.email,
            'CodeShift Recruiter Registration Under Review',
            'recruiterWelcomeEmail',
            {
                fullName: userData.fullName,
                companyName: userData.companyName,
                businessRegistrationNo: userData.businessRegistrationNo,
            }
        );
    }

    const responseMessage =
        userData.role === 'RECRUITER'
            ? 'Email verified successfully! Your profile is pending admin approval.'
            : 'Email verified successfully! Your account is now active.';

    return {
        message: responseMessage,
        data: result,
    };
};

export const AuthService = {
    registerCandidate,
    registerRecruiter,
    verifyEmail,
};