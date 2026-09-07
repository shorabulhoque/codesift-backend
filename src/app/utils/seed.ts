import bcrypt from "bcryptjs";
import config from "../config";
import { prisma } from "../lib/prisma";
import {
	AuthProvider,
	RecruiterVerificationStatus,
	UserRole,
	UserStatus,
} from "../../../generated/prisma/enums";

export const seedAdmin = async () => {
	try {
		const adminEmail = config.tester_data.admin.email;

		if (!adminEmail || !config.tester_data.admin.password) {
			console.log("Admin seed skipped: Environment variables missing.");
			return;
		}

		const isAdminExist = await prisma.user.findUnique({
			where: { email: adminEmail },
		});

		if (isAdminExist) {
			console.log("Admin already exists!");
			return;
		}

		const hashedPassword = await bcrypt.hash(
			config.tester_data.admin.password,
			12,
		);

		const admin = await prisma.user.create({
			data: {
				email: adminEmail,
				password: hashedPassword,
				role: UserRole.ADMIN,
				status: UserStatus.ACTIVE,
				isEmailVerified: true,
				provider: AuthProvider.CREDENTIALS,
			},
		});

		console.log("Admin Created Successfully:", admin.email);
	} catch (error) {
		console.error("Error Seeding Admin:", error);
		if (config.tester_data.admin.email) {
			await prisma.user.deleteMany({
				where: { email: config.tester_data.admin.email },
			});
		}
	}
};

export const seedRecruiter = async () => {
	try {
		const recruiterEmail = config.tester_data.recruiter.email;

		if (!recruiterEmail || !config.tester_data.recruiter.password) {
			console.log("Recruiter seed skipped: Environment variables missing.");
			return;
		}

		const isRecruiterExist = await prisma.user.findUnique({
			where: { email: recruiterEmail },
		});

		if (isRecruiterExist) {
			console.log("Recruiter already exists!");
			return;
		}

		const hashedPassword = await bcrypt.hash(
			config.tester_data.recruiter.password,
			12,
		);

		const recruiter = await prisma.user.create({
			data: {
				email: recruiterEmail,
				password: hashedPassword,
				role: UserRole.RECRUITER,
				status: UserStatus.ACTIVE,
				isEmailVerified: true,
				provider: AuthProvider.CREDENTIALS,
				recruiterProfile: {
					create: {
						fullName: config.tester_data.recruiter.name,
						designation: "Technical Recruiter",
						companyName: "Google LLC",
						companyWebsite: "https://careers.google.com",
						companySize: "10000+",
						businessRegistrationNo: "REG-GOOGLE-2026",
						verificationStatus: RecruiterVerificationStatus.APPROVED,
						location: "Mountain View, CA, USA",
					},
				},
			},
		});

		console.log("Recruiter Created Successfully:", recruiter.email);
	} catch (error) {
		console.error("Error Seeding Recruiter:", error);
		if (config.tester_data.recruiter.email) {
			await prisma.user.deleteMany({
				where: { email: config.tester_data.recruiter.email },
			});
		}
	}
};

export const seedCandidate = async () => {
	try {
		const candidateEmail = config.tester_data.candidate.email;

		if (!candidateEmail || !config.tester_data.candidate.password) {
			console.log("Candidate seed skipped: Environment variables missing.");
			return;
		}

		const isCandidateExist = await prisma.user.findUnique({
			where: { email: candidateEmail },
		});

		if (isCandidateExist) {
			console.log("Candidate already exists!");
			return;
		}

		const hashedPassword = await bcrypt.hash(
			config.tester_data.candidate.password,
			12,
		);

		const candidate = await prisma.user.create({
			data: {
				email: candidateEmail,
				password: hashedPassword,
				role: UserRole.CANDIDATE,
				status: UserStatus.ACTIVE,
				isEmailVerified: true,
				provider: AuthProvider.CREDENTIALS,
				candidateProfile: {
					create: {
						fullName: config.tester_data.candidate.name,
						headline: "Full Stack Engineer",
						experienceYears: 3,
						skills: ["TypeScript", "Node.js", "Express", "Prisma"],
					},
				},
			},
		});

		console.log("Candidate Created Successfully:", candidate.email);
	} catch (error) {
		console.error("Error Seeding Candidate:", error);
		if (config.tester_data.candidate.email) {
			await prisma.user.deleteMany({
				where: { email: config.tester_data.candidate.email },
			});
		}
	}
};
