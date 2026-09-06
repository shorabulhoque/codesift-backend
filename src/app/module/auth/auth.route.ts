import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
	"/register-candidate",
	validateRequest(AuthValidation.registerCandidateSchema),
	AuthController.registerCandidate,
);

router.post(
	"/register-recruiter",
	validateRequest(AuthValidation.registerRecruiterSchema),
	AuthController.registerRecruiter,
);

router.post(
	"/verify-email",
	validateRequest(AuthValidation.verifyEmailSchema),
	AuthController.verifyEmail,
);

router.post(
	"/login",
	validateRequest(AuthValidation.loginUserSchema),
	AuthController.loginUser,
);

export const AuthRoutes = router;
