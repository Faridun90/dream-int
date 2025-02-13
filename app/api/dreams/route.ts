import { enqueueJob } from "@/services/bullmqService";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { saveDreamToDB } from "@/services/dreamService";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();

    // Validate input
    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 },
      );
    }

    //Get user session to verify authorization
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 },
      );
    }

    const userId = Number(session.user.id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID in session." },
        { status: 400 },
      );
    }

    const savedDream = await saveDreamToDB({ userId, title, content });
    console.log("Received dream data:", { userId, title, content });

    try {
      const jobPayload = { dreamId: savedDream.id, userId, title, content };
      console.log("Enqueuing job with payload:", jobPayload);

      await enqueueJob(jobPayload);

      console.log("Job successfully enqueued from api/dreams :", jobPayload);
    } catch (error) {
      console.error("Failed to enqueue job:", error);
      throw error; // Ensure this error bubbles up for proper handling
    }

    // Respond with success message
    return NextResponse.json(savedDream, { status: 201 });
  } catch (error) {
    console.error("Error in /api/dream route:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 },
      );
    }

    const userId = Number(session.user.id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID in session." },
        { status: 400 },
      );
    }

    const dreams = await db.dream.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    console.log("Dreams fetched successfully:", dreams);

    return NextResponse.json(dreams);
  } catch (error) {
    console.error("Error fetching dreams:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}
