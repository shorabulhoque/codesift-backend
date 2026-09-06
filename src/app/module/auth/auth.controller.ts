import type { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const registerCandidate = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.registerCandidate(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: result.message,
        data: null
    });
});

const registerRecruiter = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.registerRecruiter(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: result.message,
        data: null
    });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.verifyEmail(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: result.message,
        data: result.data,
    });
});

export const AuthController = {
    registerCandidate,
    registerRecruiter,
    verifyEmail
};