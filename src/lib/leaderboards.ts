"use server"

import { db } from "@/lib/db";
import { getUserByFactID } from "@/lib/UserFetch";

export async function getLeaderboard(Userdomain: string) {
    const leaderboard = await db.points.findMany({
        where: {
            domain: Userdomain
        },
        orderBy: {
            points: 'desc'
        }
    });

    interface LeaderboardData {
        position: number;
        points: number;
        FactID: string;
        image: string;
        name: string;
    }

    // Use map to transform leaderboard into an array of promises
    const promises = leaderboard.map(async (element, index) => {
        const userData = await getUserByFactID(element.FactID) as { name: string; image: string };
        return {
            position: index + 1,
            points: element.points,
            FactID: element.FactID,
            image: userData.image,
            name: userData.name
        };
    });

    // Wait for all promises to resolve and populate leaderboardData
    const leaderboardData: LeaderboardData[] = await Promise.all(promises);

    return leaderboardData;
}