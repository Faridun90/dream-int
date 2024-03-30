import Redis from "ioredis";

const redisConfig = {
  // Redis server host
  host: process.env.REDIS_HOST || "localhost",
  // Redis server port
  port: process.env.REDIS_PORT || 6379,
};

// Create a new Redis client instance
const redisConnection = new Redis(redisConfig);

// Handle Redis client errors
redisConnection.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

// Export the Redis client instance
export default redisConnection;
