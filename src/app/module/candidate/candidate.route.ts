import express from "express";
import { USER_ROLE } from "../../constants/auth.constant";
import { auth } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { CandidateValidation } from "./candidate.validation";
import { CandidateController } from "./candidate.controller";
import { upload } from "../../middleware/multer";

const router = express.Router();

router.patch(
	"/me",
	auth(USER_ROLE.CANDIDATE),
	validateRequest(CandidateValidation.updateCandidateProfileSchema),
	CandidateController.updateMyProfile,
);

router.patch(
	"/me/avatar",
	auth(USER_ROLE.CANDIDATE),
	upload.single("avatar"),
	CandidateController.updateAvatar,
);

router.patch(
	"/me/resume",
	auth(USER_ROLE.CANDIDATE),
	upload.single("resume"),
	CandidateController.updateResume,
);

export const CandidateRoutes = router;
