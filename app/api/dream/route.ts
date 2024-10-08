import { enqueueJob } from "@/services/bullmqService";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dream = await req.json();
    console.log(dream);

    if (!dream) {
      throw new Error("Dream payload is missing");
    }
    console.log("Before job enquened");
    await enqueueJob(dream);
    console.log("After job enquened");
    // console.log("Successful enqueuing:", dream);

    // Respond with success message
    return NextResponse.json({ message: "Dream submitted successfully" });
  } catch (error) {
    console.error("Error submitting dream:", error);
    // Respond with error message
    return NextResponse.json({ error: "Failed to submit dream" });
  }
}
