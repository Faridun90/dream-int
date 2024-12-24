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
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
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

    await enqueueJob({ dreamId: savedDream.id, userId, title, content });
    console.log("Job successfully enqueued for user:", userId);

    // Respond with success message
    return NextResponse.json({ message: "Dream submitted successfully" });
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

    return NextResponse.json({ dreams });
  } catch (error) {
    console.error("Error fetching dreams:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}
