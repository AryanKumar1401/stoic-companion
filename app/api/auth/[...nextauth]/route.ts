import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
    interface User {
        id: string;
    }

    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const user = await prisma.users.findUnique({
                    where: {
                        email: credentials.email
                    },
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        password_hash: true,
                        currentstreak: true,
                        lastentrydate: true
                    }
                });

                if (!user || !user.password_hash) {
                    throw new Error("User not found");
                }

                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password_hash
                );

                if (!passwordMatch) {
                    throw new Error("Invalid password");
                }

                // Return user object with string ID for NextAuth
                return {
                    id: String(user.id),
                    email: user.email,
                    name: user.username,
                };
            }
        })
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (token?.sub) {
                session.user = {
                    ...session.user,
                    id: token.sub // Add the user ID to the session
                };
            }
            return session;
        }
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/signin"
    }
});

export { handler as GET, handler as POST };