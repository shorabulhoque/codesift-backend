import type { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import type { IAuthUser } from "../auth/auth.interface";
import { RecruiterService } from "./recruiter.service";

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IAuthUser;
	const result = await RecruiterService.updateMyProfile(user, req.body);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Recruiter profile updated successfully!",
		data: result,
	});
});

const updateCompanyLogo = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IAuthUser;
	const result = await RecruiterService.updateCompanyLogo(user, req.file);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Company logo updated successfully!",
		data: result,
	});
});

const deleteCompanyLogo = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IAuthUser;
	const result = await RecruiterService.deleteCompanyLogo(user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Company logo removed successfully!",
		data: result,
	});
});

export const RecruiterController = {
	updateMyProfile,
	updateCompanyLogo,
	deleteCompanyLogo,
};
