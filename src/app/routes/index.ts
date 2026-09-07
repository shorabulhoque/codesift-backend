import express, { type Router } from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { CandidateRoutes } from "../module/candidate/candidate.route";
import { RecruiterRoutes } from "../module/recruiter/recruiter.route";

const router: Router = express.Router();

const moduleRoutes: { path: string; route: Router }[] = [
	{
		path: "/auth",
		route: AuthRoutes,
	},
	{
		path: "/candidates",
		route: CandidateRoutes,
	},
	{
		path: "/recruiters",
		route: RecruiterRoutes,
	},
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
