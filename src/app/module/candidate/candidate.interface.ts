import type { z } from "zod";
import type { CandidateValidation } from "./candidate.validation";

export type IUpdateCandidateProfile = z.infer<
	typeof CandidateValidation.updateCandidateProfileSchema
>["body"];
