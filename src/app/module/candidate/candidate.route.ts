import express from "express";
import { USER_ROLE } from "../../constants/auth.constant";
import { auth } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { CandidateValidation } from "./candidate.validation";
import { CandidateController } from "./candidate.controller";

const router = express.Router();

router.patch(
	"/me",
	auth(USER_ROLE.CANDIDATE),
	validateRequest(CandidateValidation.updateCandidateProfileSchema),
	CandidateController.updateMyProfile,
);

export const CandidateRoutes = router;
