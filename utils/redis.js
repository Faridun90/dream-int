import Redis from "ioredis";

// Create a new Redis client instance
const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost", // Redis server host
  port: process.env.REDIS_PORT || 6379, // Redis server port
});

// Export the Redis client instance
export default redisClient;
