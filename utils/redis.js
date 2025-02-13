const Redis = require("ioredis");

const redisConnection = new Redis({
  host: "redis-19056.c285.us-west-2-2.ec2.redns.redis-cloud.com", // ✅ Replace with actual Redis Cloud host
  port: 19056, // ✅ Replace with actual Redis Cloud port
  password: "IMbvR0kaGWJxEDXhvyJZMXommf1FwRWZ", // ✅ REQUIRED for Redis Cloud authentication
  maxRetriesPerRequest: null, // ✅ Prevents BullMQ errors
  enableReadyCheck: false, // ✅ Avoids unnecessary checks
});

// Debug Redis connection
redisConnection.on("connect", () =>
  console.log("✅ Redis connected successfully."),
);
redisConnection.on("error", (err) =>
  console.error("❌ Redis connection error:", err),
);

module.exports = redisConnection;
