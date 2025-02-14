const { Worker } = require("bullmq");
const redisConnection = require("../utils/redis.js");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient(); // Initialize Prisma client

const QUEUE_NAME = "dreamTasks";
console.log("Inside dreamWorker.js");

// Initialize BullMQ worker
const dreamWorker = new Worker(
  QUEUE_NAME,
  async (job) => {
    console.log("Worker received job:", job.id, job.data);

    try {
      const { dreamId, userId, title, content } = job.data;
      console.log("Job data: ", { dreamId, userId, title, content });

      // Fetch interpretation from AI backend
      const response = await fetch(
        process.env.DREAM_BACKEND_API || "http://localhost:8080/api/dreams",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dream: content }),
        }
      );

      console.log(
        `🔄 Sent request to backend API, response status: ${response.status}`
      );

      const responseText = await response.text();
      console.log("📩 Full backend response:", responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (err) {
        console.error("❌ Failed to parse backend response:", responseText);
        throw new Error("Invalid JSON from backend");
      }

      if (!responseData || !responseData.interpretation) {
        throw new Error(
          `Backend response missing interpretation. Full Response: ${JSON.stringify(responseData)}`
        );
      }

      const { interpretation } = responseData;
      console.log(`✅ Received interpretation: ${interpretation}`);

      // ✅ **Update dream interpretation in database**
      try {
        const updatedDream = await prisma.dream.update({
          where: { id: dreamId },
          data: { interpretation },
        });
        console.log(`✅ Dream ID ${dreamId} updated successfully in DB.`);
      } catch (error) {
        console.error(`❌ Failed to update dream in DB: ${error.message}`);
      } finally {
        await prisma.$disconnect(); // Ensures Prisma disconnects properly
      }

      console.log(`✅ Dream ID ${dreamId} updated successfully in DB.`);
      console.log(`✅ Job ID: ${job.id} completed successfully`);
    } catch (error) {
      console.error(`❌ Job ID: ${job.id} failed with error: ${error.message}`);
      throw error;
    }
  },
  { connection: redisConnection, concurrency: 5 }
);

// Start the worker process
dreamWorker
  .on("completed", (job) => {
    console.log(`✅ Job ID ${job.id} completed.`);
  })
  .on("failed", (job, err) => {
    console.error(`❌ Job ID ${job.id} failed.`, err);
  });

console.log(`Worker listening for jobs on queue: ${QUEUE_NAME}`);
