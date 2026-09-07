import { UserRole } from "../../../generated/prisma/enums";

export const AUTH_ERROR_MESSAGES = {
	MISSING_REFRESH_TOKEN: "Refresh token is missing from cookies",
	INVALID_REFRESH_TOKEN: "Invalid or expired refresh token",
	USER_NOT_FOUND: "User profile not found",
	USER_BLOCKED: "Your account is blocked. Please contact support.",
	USER_PENDING: "Your account is pending activation.",
	RECRUITER_REJECTED: "Your recruiter account has been rejected.",
} as const;

export const USER_ROLE = {
	ADMIN: UserRole.ADMIN,
	CANDIDATE: UserRole.CANDIDATE,
	RECRUITER: UserRole.RECRUITER,
} as const;
