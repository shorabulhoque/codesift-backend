import app from "./app/app";
import config from "./app/config/index";
import { prisma } from "./app/lib/prisma";


async function main(): Promise<void> {
    try {
        await prisma.$connect();
        console.log("Cloud PostgreSQL database cluster connected successfully");

        app.listen(config.port, () => {
            console.log(`Server is running securely on port ${config.port}`);
        });
    } catch (error) {
        console.error("Critical failure during backend server initialization:", error);

        await prisma.$disconnect();
        process.exit(1);
    };
};

main();