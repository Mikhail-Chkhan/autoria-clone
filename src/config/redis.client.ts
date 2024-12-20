import Redis from "ioredis";

import { configs } from "./configs";

const redisClient = new Redis({
  host: configs.REDIS_HOST,
  port: Number(configs.REDIS_PORT),
});

export default redisClient;
