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

const getMyApplications = async (userId: string) => {
	const candidate = await prisma.candidateProfile.findUnique({
		where: { userId },
	});
	if (!candidate)
		throw new AppError(httpStatus.NOT_FOUND, "Candidate profile not found!");

	return await prisma.jobApplication.findMany({
		where: { candidateId: candidate.id },
		include: {
			job: {
				select: {
					id: true,
					title: true,
					description: true,
					assignmentDetails: true,
					deadline: true,
					recruiter: {
						select: {
							companyName: true,
							companyLogo: true,
							location: true,
						},
					},
				},
			},
		},
		orderBy: { createdAt: "desc" },
	});
};

const getJobApplications = async (recruiterUserId: string, jobId: string) => {
	const recruiter = await prisma.recruiterProfile.findUnique({
		where: { userId: recruiterUserId },
	});

	if (!recruiter) {
		throw new AppError(httpStatus.NOT_FOUND, "Recruiter profile not found!");
	}

	const job = await prisma.job.findFirst({
		where: {
			id: jobId,
			recruiterId: recruiter.id,
		},
	});

	if (!job) {
		throw new AppError(
			httpStatus.FORBIDDEN,
			"You are not authorized to view applications for this job!",
		);
	}

	return await prisma.jobApplication.findMany({
		where: { jobId },
		include: {
			candidate: {
				select: {
					id: true,
					fullName: true,
					phone: true,
					headline: true,
					githubUrl: true,
					linkedinUrl: true,
					resumeUrl: true,
					skills: true,
					user: {
						select: {
							email: true,
						},
					},
				},
			},
		},
		orderBy: { createdAt: "desc" },
	});
};

export const ApplicationService = {
	applyJob,
	reviewApplication,
	getMyApplications,
	getJobApplications,
};
