import NextAuth from "next-auth";

import { db } from "./lib/db";
import google from "next-auth/providers/google"
import github from "next-auth/providers/github";

export const authOptions = {
    providers: [google, github],
    callbacks: {
        async signIn(params: {
            user: any,
            account: any,
        }) {
            const { user, account } = params;
            // console.log("signIn", user, account, "email of user", user.email);

            const userExisting = await db.userCredential.findUnique({
                where: { email: user.email }
            })

            if (!userExisting) {
                const AlreadyMember = await db.existingMembersList.findUnique({
                    where: { email: user.email }
                })

                if (AlreadyMember) {
                    await db.userCredential.create({
                        data: {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            role: "onboarding",
                            RegisterDate: new Date().toISOString(),
                            provider: account.provider,
                        },
                    });
                    console.log("new user created");
                } else {
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
                }
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
            session.user.role = token.user;
            return session;
        },
    }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);