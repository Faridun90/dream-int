import Redis from "ioredis";

const redisConfig = {
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PWD,
};

// Create a new Redis client instance
const redisConnection = new Redis(redisConfig);

// Handle Redis client errors
redisConnection.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

// Export the Redis client instance
export default redisConnection;
