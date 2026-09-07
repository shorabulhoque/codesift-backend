import express, { type Router } from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { CandidateRoutes } from "../module/candidate/candidate.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
