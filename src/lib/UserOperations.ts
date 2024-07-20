"use server"

import { db } from "@/lib/db";

const roles = ["newbie", "onboarding", "member", "moderator", "president"]

export async function promoteUser(email: string) {
    const presentRole = await db.userCredential.findUnique({
        where: {
            email: email
        },
        select: {
            role: true
        }
    })

    const nextRole = presentRole?.role ? roles[roles.indexOf(presentRole.role) + 1] : null;

    await db.userCredential.update({
        where: {
            email: email
        },
        data: {
            role: nextRole
        }
    })
}

export async function demoteUser(email: string) {
    const presentRole = await db.userCredential.findUnique({
        where: {
            email: email
        },
        select: {
            role: true
        }
    })

    const nextRole = presentRole?.role ? roles[roles.indexOf(presentRole.role) - 1] : null;

    await db.userCredential.update({
        where: {
            email: email
        },
        data: {
            role: nextRole
        }
    })
}

export async function updateProfile(factId: string, Name: string, githubURL: string, linkedInURL: string) {
    try {
        const output = await db.user.update({
            where: {
                FactID: factId
            },
            data: {
                name: Name,
                githubURL: githubURL,
                linkedInURL: linkedInURL
            }
        })

        await db.userCredential.update({
            where: {
                email: output.email
            },
            data: {
                name: Name
            }
        })
    } catch (e) {
        return false
    }
    return true;
}