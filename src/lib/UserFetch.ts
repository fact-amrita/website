import { db } from "@/lib/db";

// To get a user by email
export async function getUserByemail(email: string) {
    const user = await db.user.findUnique({
        where: {
            email: email
        }
    })
    return user
}

// To get a user by FactID
export async function getUserByFactID(factID: string) {
    const user = await db.user.findUnique({
        where: {
            FactID: factID
        }
    })
    return user
}

// To find a user by name
export async function findUserbyName(name: string) {
    const users = await db.user.findMany({
        where: {
            name: {
                contains: name
            }
        }
    })

    return users
}