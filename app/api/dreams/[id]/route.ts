import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 },
    );
  }

  const dreamId = parseInt(params.id, 10);
  const userId = Number(session.user.id);

  try {
    const dream = await db.dream.findUnique({
      where: { id: dreamId, userId },
    });

    if (!dream) {
      return NextResponse.json({ error: "Dream not found." }, { status: 404 });
    }

    return NextResponse.json(dream, { status: 200 });
  } catch (error) {
    console.error("Error fetching dream:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}
