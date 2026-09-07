import express from "express";
import { USER_ROLE } from "../../constants/auth.constant";
import { auth } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { ApplicationController } from "./application.controller";
import { ApplicationValidation } from "./application.validation";

const router = express.Router();

router.post(
	"/",
	auth(USER_ROLE.CANDIDATE),
	validateRequest(ApplicationValidation.applyJobSchema),
	ApplicationController.applyJob,
);
router.patch(
	"/:id/review",
	auth(USER_ROLE.RECRUITER),
	validateRequest(ApplicationValidation.reviewApplicationSchema),
	ApplicationController.reviewApplication,
);

export const ApplicationRoutes = router;
