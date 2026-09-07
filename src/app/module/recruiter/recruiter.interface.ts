import type { z } from "zod";
import type { RecruiterValidation } from "./recruiter.validation";

export type IUpdateRecruiterProfile = z.infer<
	typeof RecruiterValidation.updateRecruiterProfileSchema
>["body"];
