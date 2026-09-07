import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import type { IAuthUser } from "../auth/auth.interface";
import type { IUpdateCandidateProfile } from "./candidate.interface";

const updateMyProfile = async (
	authUser: IAuthUser,
	payload: IUpdateCandidateProfile,
) => {
	const user = await prisma.user.findUnique({
		where: { id: authUser.userId, isDeleted: false },
		include: { candidateProfile: true },
	});

	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, "User not found");
	}

	if (!user.candidateProfile) {
		throw new AppError(httpStatus.NOT_FOUND, "Candidate profile not found");
	}

	const updateData = Object.fromEntries(
		Object.entries(payload).filter(([_, value]) => value !== undefined),
	);

	const updatedProfile = await prisma.candidateProfile.update({
		where: { userId: user.id },
		data: updateData,
	});

	return updatedProfile;
};

export const CandidateService = {
	updateMyProfile,
};
