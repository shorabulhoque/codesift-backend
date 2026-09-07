import { z } from "zod";
import {
	RecruiterVerificationStatus,
	UserStatus,
} from "../../../../generated/prisma/enums";

const verifyRecruiterSchema = z.object({
	body: z
		.object({
			status: z.enum([
				RecruiterVerificationStatus.APPROVED,
				RecruiterVerificationStatus.REJECTED,
			]),
			rejectionReason: z.string().optional(),
		})
		.refine(
			(data) => {
				if (
					data.status === RecruiterVerificationStatus.REJECTED &&
					!data.rejectionReason
				) {
					return false;
				}
				return true;
			},
			{
				message: "Rejection reason is required when rejecting a recruiter!",
				path: ["rejectionReason"],
			},
		),
});

const updateUserStatusSchema = z.object({
	body: z.object({
		status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.PENDING]),
	}),
});

export const AdminValidation = {
	verifyRecruiterSchema,
	updateUserStatusSchema,
};
