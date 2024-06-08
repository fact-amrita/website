import { db } from "@/lib/db";

export async function promoteUser(email: string, role: string) {
    const output = await db.userCredential.update({
        where: {
            email: email
        },
        data: {
            role: role
        }
    })
}