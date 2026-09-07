import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import type { ApplicationStatus } from "../../../../generated/prisma/enums";

const applyJob = async (
	userId: string,
	payload: { jobId: string; submissionCode: string },
) => {
	const candidate = await prisma.candidateProfile.findUnique({
		where: { userId },
	});
	if (!candidate)
		throw new AppError(httpStatus.NOT_FOUND, "Candidate profile not found!");

	return await prisma.jobApplication.create({
		data: {
			jobId: payload.jobId,
			candidateId: candidate.id,
			submissionCode: payload.submissionCode,
		},
	});
};

const reviewApplication = async (
	applicationId: string,
	payload: {
		marks?: number;
		reviewerFeedback?: string;
		interviewDate?: string;
		status?: ApplicationStatus;
	},
) => {
	const application = await prisma.jobApplication.findUnique({
		where: { id: applicationId },
	});
	if (!application)
		throw new AppError(httpStatus.NOT_FOUND, "Application not found!");

	const updateData: {
		marks?: number;
		reviewerFeedback?: string;
		interviewDate?: Date;
		status?: ApplicationStatus;
	} = {};

	if (payload.marks !== undefined) updateData.marks = payload.marks;
	if (payload.reviewerFeedback !== undefined)
		updateData.reviewerFeedback = payload.reviewerFeedback;
	if (payload.interviewDate !== undefined)
		updateData.interviewDate = new Date(payload.interviewDate);
	if (payload.status !== undefined) updateData.status = payload.status;

	return await prisma.jobApplication.update({
		where: { id: applicationId },
		data: updateData,
	});
};

export const ApplicationService = { applyJob, reviewApplication };
