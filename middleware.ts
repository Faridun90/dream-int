import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (!token.isOnboarded && new URL(req.url).pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  if (token.isOnboarded && new URL(req.url).pathname === "/onboarding") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/onboarding", "/admin"],
};
