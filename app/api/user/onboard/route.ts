import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface OnboardRequestBody {
  id: number;
  additionalInfo: Record<string, any>;
}

export async function POST(req: NextRequest) {
  try {
    const body: OnboardRequestBody = await req.json();

    const { id, additionalInfo } = body;

    // Validate that required fields are present
    if (!id || !additionalInfo) {
      return NextResponse.json(
        { message: "User ID and additional information are required" },
        { status: 400 },
      );
    }

    // Update user onboarding status
    await prisma.user.update({
      where: { id },
      data: {
        isOnboarded: true,
      },
    });

    return NextResponse.json(
      { message: "Onboarding completed successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error in onboarding API:", error);

    return NextResponse.json(
      { message: `Internal server error: ${error.message}` },
      { status: 500 },
    );
  }
}
