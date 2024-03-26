import { createWorker } from "bullmq";
import redisClient from "../utils/redis";

const worker = createWorker({
  connection: {
    client: redisClient,
  },
  queueName: "dreamTasks", //Name of BullMQ queue
  concurrency: 5, // Number of concurrent task processing jobs
});

//Define task processing logic
worker.on("job", async (job) => {
  //Perform task processing logic here
  console.log(`Processing task: ${job.id}`);
  //Examle: Simulate task processing for 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(`Task processed: ${job.id}`);
});

//Start the worker process
worker.start();
