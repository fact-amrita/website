import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

import { db } from "./lib/db";
import github from "next-auth/providers/github";

export const authOptions = {
    providers: [Google, github],

    callbacks: {
        async signIn(params: {
            user: any,
            account: any,
        }) {
            const { user, account } = params;
            // console.log("signIn", user,account,profile);

            const userExisting = await db.userCredential.findUnique({
                where: { email: user.email },
            });

            if (!userExisting) {
                await db.userCredential.create({
                    data: {
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        role: "newbie",
                        RegisterDate: new Date().toISOString(),
                        provider: account.provider,
                    },
                });
                console.log("new user created");
            } else {
                if (userExisting?.provider !== account.provider) {
                    console.log("Different provider error")
                    return "/app/auth/login?error=Account already exists with different provider, please login with it."
                }
                console.log("user already exists");
            }

            return true;
        },
        async jwt(params: {
            token: any,
            user: any,
        }
        ) {
            const { token, user } = params;
            if (user) {
                const userExisting = await db.userCredential.findUnique({
                    where: { email: user.email },
                });

                token.user = userExisting?.role || "newbie";
            }
            return token;
        },
        async session(params: {
            session: any,
            token: any,
        }
        ) {
            const { session, token } = params;
            // Include user role in the session
            session.user.role = token.user;
            return session;
        },
    }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);