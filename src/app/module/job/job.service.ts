import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

const createJob = async (
	userId: string,
	payload: {
		title: string;
		description: string;
		assignmentDetails: string;
		deadline?: string;
	},
) => {
	const recruiter = await prisma.recruiterProfile.findUnique({
		where: { userId },
	});
	if (!recruiter)
		throw new AppError(httpStatus.NOT_FOUND, "Recruiter profile not found!");

	return await prisma.job.create({
		data: {
			title: payload.title,
			description: payload.description,
			assignmentDetails: payload.assignmentDetails,
			deadline: payload.deadline ? new Date(payload.deadline) : null,
			recruiterId: recruiter.id,
		},
	});
};

const getAllJobs = async () => {
	return await prisma.job.findMany({
		include: {
			recruiter: {
				select: { companyName: true, location: true, companyLogo: true },
			},
		},
		orderBy: { createdAt: "desc" },
	});
};

export const JobService = { createJob, getAllJobs };
