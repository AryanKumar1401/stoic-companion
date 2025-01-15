import NextAuth from 'next-auth';
import { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authOptions } from '@/app/lib/auth';

// declare module "next-auth" {
//     interface User {
//         id: string;
//     }

//     interface Session {
//         user: {
//             id: string;
//             email: string;
//             name?: string;
//         }
//     }
// }

// export const authOptions: AuthOptions = {
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) {
//                     throw new Error("Invalid credentials");
//                 }

//                 const user = await prisma.users.findUnique({
//                     where: {
//                         email: credentials.email
//                     },
//                     select: {
//                         id: true,
//                         email: true,
//                         username: true,
//                         password_hash: true,
//                         currentstreak: true,
//                         lastentrydate: true
//                     }
//                 });

//                 if (!user || !user.password_hash) {
//                     throw new Error("User not found");
//                 }

//                 const passwordMatch = await bcrypt.compare(
//                     credentials.password,
//                     user.password_hash
//                 );

//                 if (!passwordMatch) {
//                     throw new Error("Invalid password");
//                 }

//                 // Return user object with string ID for NextAuth
//                 return {
//                     id: String(user.id),
//                     email: user.email,
//                     name: user.username,
//                 };
//             }
//         })
//     ],
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = user.id;
//                 token.email = user.email;
//                 token.name = user.name;
//             }
//             return token;
//         },
//         session: async ({ session, token }: { session: any, token: any }) => {
//             if (session?.user) {
//                 session.user.id = token.id as string;
//                 session.user.email = token.email as string;
//                 session.user.name = token.name as string;
//             }
//             return session;
//         },
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     session: {
//         strategy: "jwt"
//     },
//     pages: {
//         signIn: "/signin"
//     },
//     debug: process.env.NODE_ENV === 'development',
// };

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };