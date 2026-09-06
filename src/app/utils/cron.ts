import cron from "node-cron";
import { prisma } from "../lib/prisma";

export const initUnverifiedUserCleanupCron = () => {
	// Runs every hour
	cron.schedule("0 * * * *", async () => {
		const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

		try {
			const deletedUsers = await prisma.user.deleteMany({
				where: {
					isEmailVerified: false,
					createdAt: {
						lt: oneHourAgo,
					},
				},
			});
			console.log(`[CRON] Cleaned up ${deletedUsers.count} unverified users.`);
		} catch (error) {
			console.error("[CRON ERROR]:", error);
		}
	});
};
