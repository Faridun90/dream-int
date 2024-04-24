import { Queue } from "bullmq";
import redisConnection from "@/utils/redis";

// Define BullMQ queue name
const QUEUE_NAME = "dreamTasks";
const connection = redisConnection;
// Initialize BullMQ queue
const dreamQueue = new Queue(QUEUE_NAME, { connection });

// Define enqueueJob function
export async function enqueueJob(payload: string): Promise<void> {
  try {
    // Enqueue a new job with the payload
    await dreamQueue.add("processDream", { payload });
    console.log("Job enqueued successfully:", payload);
  } catch (error) {
    console.error("Error enqueuing job:", error);
    throw new Error("Failed to enqueue job");
  }
}
