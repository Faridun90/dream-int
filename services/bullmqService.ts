import { Queue } from "bullmq";
import redisConnection from "@/utils/redis";

// Define BullMQ queue name
const QUEUE_NAME = "dreamTasks";

// Initialize BullMQ queue
const dreamQueue = new Queue(QUEUE_NAME, { connection: redisConnection });

// Define enqueueJob function
export async function enqueueJob(payload: {
  dreamId: number;
  userId: number;
  title: string;
  content: string;
}): Promise<void> {
  try {
    console.log("Attempting to enqueue job:", payload);

    // Enqueue the job
    const job = await dreamQueue.add("processDream", payload, {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
      removeOnComplete: false, // Keep completed jobs for debugging
      removeOnFail: false, // Keep failed jobs
    });

    console.log(`✅ Job enqueued successfully: ID ${job.id}`);
  } catch (error) {
    console.error("❌ Error enqueuing job:", error);
  }
}

// enqueueJob({
//   dreamId: 1,
//   userId: 123,
//   title: "Flying in a dream",
//   content: "I was flying over a mountain",
// });
