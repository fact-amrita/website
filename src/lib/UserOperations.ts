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

export async function updateProfile(factId: string, formData: {
    Name: string;
    LinkedinProfile: string;
    GithubProfile: string;
    About: string;
    ReactExp: string;
    NodeExp: string;
    HTMLCSSExp: string;
    PythonExp: string;
    JSExp: string;
}
) {
    try {
        const output = await db.user.update({
            where: {
                FactID: factId
            },
            data: {
                name: formData.Name,
                githubURL: formData.GithubProfile,
                linkedInURL: formData.LinkedinProfile,
                About: formData.About,
                ReactExp: formData.ReactExp,
                NodeExp: formData.NodeExp,
                HTMLCSSExp: formData.HTMLCSSExp,
                PythonExp: formData.PythonExp,
                JSExp: formData.JSExp
            }
        })

        await db.userCredential.update({
            where: {
                email: output.email
            },
            data: {
                name: formData.Name
            }
        })
    } catch (e) {
        return false
    }
    return true;
}