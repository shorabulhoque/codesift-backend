import type { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import type { IAuthUser } from "../auth/auth.interface";
import { CandidateService } from "./candidate.service";

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
	const user = req.user as IAuthUser;
	const result = await CandidateService.updateMyProfile(user, req.body);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Candidate profile updated successfully!",
		data: result,
	});
});

export const CandidateController = {
	updateMyProfile,
};
