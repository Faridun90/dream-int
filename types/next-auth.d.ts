import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    isOnboarded: boolean;
  }
  interface Session {
    user: User & {
      id: number;
      username: string;
      isOnboarded: boolean;
    };
    token: {
      username: string;
    };
  }
}
