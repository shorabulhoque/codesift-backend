import express from "express";
import { USER_ROLE } from "../../constants/auth.constant";
import { auth } from "../../middleware/auth";
import { upload } from "../../middleware/multer";
import validateRequest from "../../middleware/validateRequest";
import { RecruiterController } from "./recruiter.controller";
import { RecruiterValidation } from "./recruiter.validation";

const router = express.Router();

router.patch(
	"/me",
	auth(USER_ROLE.RECRUITER),
	validateRequest(RecruiterValidation.updateRecruiterProfileSchema),
	RecruiterController.updateMyProfile,
);

router.patch(
	"/me/logo",
	auth(USER_ROLE.RECRUITER),
	upload.single("logo"),
	RecruiterController.updateCompanyLogo,
);

router.delete(
	"/me/logo",
	auth(USER_ROLE.RECRUITER),
	RecruiterController.deleteCompanyLogo,
);

export const RecruiterRoutes = router;
