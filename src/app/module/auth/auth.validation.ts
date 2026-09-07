import { z } from "zod";

const passwordValidation = z
	.string({ message: "Password is required" })
	.min(8, "Password must be at least 8 characters long")
	.max(32, "Password cannot exceed 32 characters")
	.regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
	.regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
	.regex(/[0-9]/, "Password must contain at least 1 number")
	.regex(/[^A-Za-z0-9]/, "Password must contain at least 1 special character");

export const registerCandidateSchema = z.object({
	body: z.object({
		email: z
			.string({ message: "Email is required" })
			.email("Invalid email address format"),
		password: passwordValidation,
		fullName: z
			.string({ message: "Full name is required" })
			.min(3, "Full name must be at least 3 characters long")
			.max(50, "Full name cannot exceed 50 characters"),
	}),
});

export const registerRecruiterSchema = z.object({
	body: z.object({
		email: z
			.string({ message: "Email is required" })
			.email("Invalid email address format"),
		password: passwordValidation,
		fullName: z
			.string({ message: "Full name is required" })
			.min(3, "Full name must be at least 3 characters long")
			.max(50, "Full name cannot exceed 50 characters"),
		companyName: z
			.string({ message: "Company name is required" })
			.min(2, "Company name must be at least 2 characters long"),
		businessRegistrationNo: z
			.string({ message: "Business registration number is required" })
			.min(3, "Business registration number is required"),
	}),
});

export const verifyEmailSchema = z.object({
	body: z.object({
		email: z
			.string({ message: "Email is required" })
			.email("Invalid email address format"),
		otp: z
			.string({ message: "OTP is required" })
			.length(6, "OTP must be exactly 6 digits"),
	}),
});

export const loginUserSchema = z.object({
	body: z.object({
		email: z
			.string({ message: "Email is required" })
			.email("Invalid email address format"),
		password: z.string({ message: "Password is required" }),
	}),
});

const GoogleLoginZodSchema = z.object({
	body: z.object({
		idToken: z.string({
			message: "Google ID Token is required",
		}),
	}),
});

export const AuthValidation = {
	registerCandidateSchema,
	registerRecruiterSchema,
	verifyEmailSchema,
	loginUserSchema,
	GoogleLoginZodSchema,
};
