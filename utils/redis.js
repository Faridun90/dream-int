import Redis from "ioredis";

const redisConfig = {
  host: REDIS_HOST || "localhost",
  port: REDIS_PORT || 6379,
  password: REDIS_PWD,
  maxRetriesPerRequest: null,
};
console.log(redisConfig);
// Create a new Redis client instance
const redisConnection = new Redis(redisConfig);

// Handle Redis client errors
redisConnection.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

// Export the Redis client instance
export default redisConnection;
