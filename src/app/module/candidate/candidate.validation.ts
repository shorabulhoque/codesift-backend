import { z } from "zod";

const updateCandidateProfileSchema = z.object({
	body: z.object({
		fullName: z.string().optional(),
		phone: z.string().optional(),
		headline: z
			.string()
			.max(100, "Headline cannot exceed 100 characters")
			.optional(),
		bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
		experienceYears: z
			.number()
			.min(0, "Experience years cannot be negative")
			.optional(),
		address: z.string().optional(),
		githubUrl: z
			.string()
			.url("Invalid URL format")
			.optional()
			.or(z.literal("")),
		linkedinUrl: z
			.string()
			.url("Invalid URL format")
			.optional()
			.or(z.literal("")),
		skills: z.array(z.string()).optional(),
	}),
});

export const CandidateValidation = {
	updateCandidateProfileSchema,
};
