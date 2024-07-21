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

export async function getYearLeaderboard(Userdomain: string) {
    const presentYear = (new Date().getFullYear()).toString();

    var YearLeaderboard = [];

    const peopleOfDomain = await db.user.findMany({
        where: {
            domain: Userdomain
        }
    });

    const output = await db.completedTask.findMany({
        where: {
            submissionYear: presentYear,
        }
    });

    for (let i = 0; i < peopleOfDomain.length; i++) {
        let points = 0;
        for (let j = 0; j < output.length; j++) {
            if (peopleOfDomain[i].FactID === output[j].FactID) {
                points += output[j].awarded || 0;
            }
        }
        YearLeaderboard.push({
            points: points,
            FactID: peopleOfDomain[i].FactID,
            image: peopleOfDomain[i].image,
            name: peopleOfDomain[i].name
        });
    }

    YearLeaderboard.sort((a, b) => {
        return b.points - a.points;
    });

    YearLeaderboard = YearLeaderboard.map((element, index) => {
        return {
            position: index + 1,
            points: element.points,
            FactID: element.FactID,
            image: element.image,
            name: element.name
        };
    });

    return YearLeaderboard;
}

export async function getSemesterLeaderboard(Userdomain: string, factId: string) {
    var SemesterLeaderboard = [];
    try {
        const peopleOfDomain = await db.user.findMany({
            where: {
                domain: Userdomain
            }
        });
        const presentPerson = await db.user.findUnique({
            where: {
                FactID: factId
            }
        });
        const presentSemester = presentPerson?.semester;

        const output = await db.completedTask.findMany({
            where: {
                submissionSemester: presentSemester,
            }
        });

        for (let i = 0; i < peopleOfDomain.length; i++) {
            let points = 0;
            for (let j = 0; j < output.length; j++) {
                if (peopleOfDomain[i].FactID === output[j].FactID) {
                    points += output[j].awarded || 0;
                }
            }
            SemesterLeaderboard.push({
                points: points,
                FactID: peopleOfDomain[i].FactID,
                image: peopleOfDomain[i].image,
                name: peopleOfDomain[i].name
            });
        }

        SemesterLeaderboard.sort((a, b) => {
            return b.points - a.points;
        });

        SemesterLeaderboard = SemesterLeaderboard.map((element, index) => {
            return {
                position: index + 1,
                points: element.points,
                FactID: element.FactID,
                image: element.image,
                name: element.name
            };
        });

        return SemesterLeaderboard;
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        return null;
    }
}