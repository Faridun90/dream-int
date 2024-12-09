import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/db";

const secret = process.env.NEXTAUTH_SECRET; // Ensure this is set in your .env file

export async function middleware(req: NextRequest) {
  // Extract token from the request
  const token = await getToken({ req, secret });

  // If no token exists, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Extract user ID from the token and ensure it's a number
  const userId = Number(token.id); // Ensure ID is treated as a number

  if (isNaN(userId)) {
    console.error("Invalid user ID in token");
    return NextResponse.redirect(new URL("/error", req.url)); // Redirect to error page
  }

  try {
    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // If the user is not onboarded, redirect to the onboarding flow
    if (user && !user.isOnboarded) {
      return NextResponse.redirect(new URL("/onboarding/step1", req.url));
    }
  } catch (error) {
    console.error("Middleware error fetching user:", error);
    return NextResponse.redirect(new URL("/error", req.url)); // Optional error page
  }

  // Allow the request to proceed if the user is onboarded
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Protect these routes
};
