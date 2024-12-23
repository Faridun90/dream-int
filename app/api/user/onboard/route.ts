import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // Get session to verify the user
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Convert session.user.id to a number
    const userId = Number(session.user.id);

    console.log("Session user ID:", userId);

    // Check if userId is a valid number
    if (isNaN(userId)) {
      console.log("Invalid user ID:", userId);
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Parse the request body
    const body = await req.json();
    const { age, gender } = body;

    // Validate required fields
    if (!age || !gender) {
      return NextResponse.json(
        { error: "Age and gender are required" },
        { status: 400 },
      );
    }

    //Validate age and gender format
    if (
      typeof age !== "number" ||
      age <= 18 ||
      age > 120 ||
      !["male", "female", "other"].includes(gender)
    ) {
      return NextResponse.json(
        { error: "Invalid age or gender" },
        { status: 400 },
      );
    }

    //Update the user's onboarding status and additional info
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        isOnboarded: true,
        age,
        gender,
      },
    });

    console.log("Updated user:", updatedUser);

    return NextResponse.json({ message: "Onboarding completed successfuly" });
  } catch (error: any) {
    console.error("Error in oboarding route:", error);

    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
