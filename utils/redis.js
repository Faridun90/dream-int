const Redis = require("ioredis");
require("dotenv").config(); // Ensure this line is here if not already

const redisConnection = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

// Debug Redis connection
redisConnection.on("connect", () =>
  console.log("✅ Redis connected successfully.")
);
redisConnection.on("error", (err) =>
  console.error("❌ Redis connection error:", err)
);

module.exports = redisConnection;
