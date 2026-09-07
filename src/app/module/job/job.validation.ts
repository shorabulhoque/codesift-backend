import { z } from "zod";

const createJobSchema = z.object({
	body: z.object({
		title: z.string({ message: "Job title is required" }),
		description: z.string({ message: "Job description is required" }),
		assignmentDetails: z.string({ message: "Assignment details are required" }),
		deadline: z.string().optional(),
	}),
});

export const JobValidation = { createJobSchema };
