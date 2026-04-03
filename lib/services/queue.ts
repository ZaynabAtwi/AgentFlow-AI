import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = process.env.REDIS_URL ? new IORedis(process.env.REDIS_URL) : undefined;

export const scrapingQueue = connection ? new Queue("scraping", { connection }) : null;
export const agentQueue = connection ? new Queue("agent-generation", { connection }) : null;
