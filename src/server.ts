import app from "./app";
import config from "./config";

function main() {
    try {
        app.listen(config.port, () => {
            console.log(`Server is running securely on port ${config.port}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    };
};

main();