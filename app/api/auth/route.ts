import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import NextAuth, { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";

import * as bcrypt from "bcrypt";
import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.id || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const correctPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!correctPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as User;
      }
      return token;
    },

    // async session({ token, session }) {
    //   if (token.user) {
    //     session.user = token.user as User;
    //   }
    //   return session;
    // },
  },
  debug: process.env.NODE_ENV !== "production",
};

export const getServerAuthSession = () => getServerSession(authOptions);

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
