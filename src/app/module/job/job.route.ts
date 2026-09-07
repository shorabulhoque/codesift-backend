import express from "express";
import { USER_ROLE } from "../../constants/auth.constant";
import { auth } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { JobController } from "./job.controller";
import { JobValidation } from "./job.validation";

const router = express.Router();

router.post(
	"/",
	auth(USER_ROLE.RECRUITER),
	validateRequest(JobValidation.createJobSchema),
	JobController.createJob,
);
router.get(
	"/",
	auth(USER_ROLE.CANDIDATE, USER_ROLE.RECRUITER, USER_ROLE.ADMIN),
	JobController.getAllJobs,
);

export const JobRoutes = router;
