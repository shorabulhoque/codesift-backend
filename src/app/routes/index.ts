import express, { type Router } from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { CandidateRoutes } from "../module/candidate/candidate.route";
import { RecruiterRoutes } from "../module/recruiter/recruiter.route";
import { AdminRoutes } from "../module/admin/admin.route";
import { JobRoutes } from "../module/job/job.route";
import { ApplicationRoutes } from "../module/application/application.route";

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
	{
		path: "/admins",
		route: AdminRoutes,
	},
	{
		path: "/jobs",
		route: JobRoutes,
	},
	{ path: "/applications", route: ApplicationRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
