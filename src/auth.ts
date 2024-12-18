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
                }
            } else {
                if (userExisting?.provider !== account.provider) {
                    return "/app/login?error=Account already exists with different provider, please login with it."
                }
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

                const userData = await db.user.findUnique({
                    where: {
                        email: user.email
                    }
                })

                if (userData) {
                    token.name = userData.name;
                    token.factId = userData.FactID || "";
                    token.domain = userData.domain || "";
                }

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
            if (token.factId) {
                session.user.name = token.name;
                session.user.factId = token.factId;
                session.user.domain = token.domain;
            }
            return session;
        },
    }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);