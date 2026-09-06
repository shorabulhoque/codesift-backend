import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
    '/register-candidate',
    validateRequest(AuthValidation.registerCandidateSchema),
    AuthController.registerCandidate
);

router.post(
    '/register-recruiter',
    validateRequest(AuthValidation.registerRecruiterSchema),
    AuthController.registerRecruiter
);

export const AuthRoutes = router;