"use server"

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

export async function getUserCompletedTasks(factID: string) {
    const tasks = await db.points.findMany({
        where: {
            FactID: factID
        },
        include: {
            completedTasks: true
        }
    })

    return tasks.map(task => task.completedTasks);
}

export async function getUserPendingTasks(factID: string) {
    const tasks = await db.points.findMany({
        where: {
            FactID: factID
        },
        include: {
            pendingTasks: true
        }
    })

    return tasks.map(task => task.pendingTasks)
}

export async function getUserProfile(factID: string) {
    const user = await db.user.findUnique({
        where: {
            FactID: factID
        }
    })

    const pointsDat = await db.points.findUnique({
        where: {
            FactID: factID
        }
    })

    let points: number = 0

    if (!pointsDat) {
        points = 0
    } else {
        points = pointsDat.points
    }

    var completedTasks = (await getUserCompletedTasks(factID))[0].length;

    // user.points = pointsDat.points
    var userDat = { points: points, TasksCount: completedTasks, ...user }

    return userDat
}