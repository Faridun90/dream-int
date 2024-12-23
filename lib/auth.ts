import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcryptjs";

declare module "next-auth" {
  interface User {
    isOnboarded: boolean;
  }

  interface AdapterUser {
    isOnboarded: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
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

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password,
        );

        if (!passwordMatch) {
          return null;
        }
        return {
          id: existingUser.id.toString(),
          username: existingUser.username,
          email: existingUser.email,
          isOnboarded: existingUser.isOnboarded,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If the user exists, add user data to the token
      if (user) {
        token.isOnboarded = user.isOnboarded;
        token.id = user.id;
      }

      // Fetch updated user data from the database during every request
      const dbUser = await db.user.findUnique({
        where: { id: Number(token.id) },
      });

      if (dbUser) {
        token.isOnboarded = dbUser.isOnboarded;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        username: token.username as string,
        email: token.email,
        isOnboarded: token.isOnboarded as boolean,
      };

      return session;
    },
  },
};
