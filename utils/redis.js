// utils/redis.js

const Redis = require("ioredis");

const redisConfig = {
  // Redis server host
  host: process.env.REDIS_HOST || "localhost",
  // Redis server port
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  // Redis password
  password: process.env.REDIS_PASSWORD, // Ensure this environment variable is set
};

// Create a new Redis client instance
const redisConnection = new Redis(redisConfig);

// Handle Redis client errors
redisConnection.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

// Export the Redis client instance
module.exports = redisConnection;
