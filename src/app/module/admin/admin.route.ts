import express from "express";
import { USER_ROLE } from "../../constants/auth.constant";
import { auth } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { AdminController } from "./admin.controller";
import { AdminValidation } from "./admin.validation";

const router = express.Router();

router.get(
	"/recruiters/pending",
	auth(USER_ROLE.ADMIN),
	AdminController.getPendingRecruiters,
);

router.patch(
	"/recruiters/:id/verify",
	auth(USER_ROLE.ADMIN),
	validateRequest(AdminValidation.verifyRecruiterSchema),
	AdminController.verifyRecruiter,
);

router.patch(
	"/users/:id/status",
	auth(USER_ROLE.ADMIN),
	validateRequest(AdminValidation.updateUserStatusSchema),
	AdminController.updateUserStatus,
);

export const AdminRoutes = router;
