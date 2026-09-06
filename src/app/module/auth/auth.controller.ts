import type { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../config";

const registerCandidate = catchAsync(async (req: Request, res: Response) => {
	const result = await AuthService.registerCandidate(req.body);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: result.message,
		data: null,
	});
});

const registerRecruiter = catchAsync(async (req: Request, res: Response) => {
	const result = await AuthService.registerRecruiter(req.body);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: result.message,
		data: null,
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

const loginUser = catchAsync(async (req: Request, res: Response) => {
	const { refreshToken, accessToken } = await AuthService.loginUser(req.body);

	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		secure: config.isProduction,
		sameSite: "none",
		maxAge: 1000 * 60 * 15,
	});

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: config.isProduction,
		sameSite: "none",
		maxAge: 1000 * 60 * 60 * 24 * 7,
	});

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User logged in successfully!",
		data: { refreshToken, accessToken },
	});
});

export const AuthController = {
	registerCandidate,
	registerRecruiter,
	verifyEmail,
	loginUser,
};
