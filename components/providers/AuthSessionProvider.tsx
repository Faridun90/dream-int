"use client";

import React, { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface ProviderProps {
  children: ReactNode;
  session?: Session | null;
}

export default function AuthSessionProvider({
  children,
  session,
}: ProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
