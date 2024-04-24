import { Job, Worker } from "bullmq";
import redisConnection from "@/utils/redis";

// Define BullMQ queue name
const QUEUE_NAME = "dreamTasks";
const connection = redisConnection;

// Initialize BullMQ worker
const worker = new Worker(
  QUEUE_NAME,
  async (job: Job) => {
    // Perform task processing logic here
    console.log(`Processing task: ${job.id}`);
    // Example: Simulate task processing for 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(`Task processed: ${job.id}`);
  },
  { connection }
);

// Start the worker process
worker
  .on("completed", (job) => {
    console.log(`Job completed: ${job.id}`);
  })
  .on("failed", (job, err) => {
    console.error(`Job failed: ${job?.id}`, err);
  });
