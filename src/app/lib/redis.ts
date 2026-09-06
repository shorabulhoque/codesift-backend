import { createClient } from "redis";
import config from "../config";

const redisOptions: Record<string, any> = {};

if (config.redis.user) {
    redisOptions.username = config.redis.user;
};

if (config.redis.password) {
    redisOptions.password = config.redis.password;
};

if (config.redis.host && config.redis.port) {
    redisOptions.socket = {
        host: config.redis.host,
        port: Number(config.redis.port),
    };
};

export const redisClient = createClient(redisOptions);

redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.on("connect", () => console.log("Redis Client Connected"));

(async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    };
})();

export default redisClient;