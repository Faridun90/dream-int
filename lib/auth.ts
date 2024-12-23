import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcryptjs";

// Extend the NextAuth User and AdapterUser interfaces
declare module "next-auth" {
  interface User {
    isOnboarded: boolean;
  }

  interface AdapterUser {
    isOnboarded: boolean;
  }
}

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT for sessions
  },
  pages: {
    signIn: "/sign-in", // Custom sign-in page
  },
  providers: [
    // Credentials-based authentication provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Find the user in the database
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && (await compare(credentials.password, user.password))) {
          // Return user data if authentication is successful
          return {
            id: user.id.toString(),
            email: user.email,
            username: user.username,
            isOnboarded: user.isOnboarded,
          };
        }

        return null; // Return null if authentication fails
      },
    }),
  ],
  callbacks: {
    // Customize JWT token behavior
    async jwt({ token, user }) {
      // Add user data to the token during sign-in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.isOnboarded = user.isOnboarded;
      }

      // Refresh token data from the database for every request
      const dbUser = await db.user.findUnique({
        where: { id: Number(token.id) },
      });

      if (dbUser) {
        token.isOnboarded = dbUser.isOnboarded;
      }

      return token;
    },
    // Add user data to the session object
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          username: token.username as string,
          isOnboarded: token.isOnboarded as boolean,
        };
      }

      return session;
    },
  },
};
