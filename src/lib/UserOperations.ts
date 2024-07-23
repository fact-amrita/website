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
    JSExp: string
}) {
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

export async function getNewbieUsers() {
    const users = await db.userCredential.findMany({
        where: {
            role: "newbie"
        }
    })

    return users;
}

export async function makeMember(email: string) {
    await db.userCredential.update({
        where: {
            email: email
        },
        data: {
            role: "onboarding"
        }
    })
}

export async function AddPoints(factId: string, points: number, reason: string, assigner: string) {
    const userData = await db.user.findUnique({
        where: {
            FactID: factId
        }
    });
    if (!userData) {
        console.log("User not found")
        return false
    }
    try {
        await db.pointsHistory.create({
            data: {
                FactID: factId,
                points: points,
                reason: reason,
                assigner: assigner,
                pointsSemester: userData.semester,
                pointsYear: (new Date().getFullYear()).toString()
            }
        })

        await db.points.update({
            where: {
                FactID: factId
            },
            data: {
                points: {
                    increment: points
                }
            }
        })
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

export async function getUsersPenaltyPoints(factId: string) {
    const penaltyPoints = await db.pointsHistory.findMany({
        where: {
            FactID: factId,
            points: {
                lt: 0
            }
        }
    })

    return penaltyPoints;
}

export async function getUsersPenaltyPointsSemester(factId: string, semester: string) {
    const penaltyPoints = await db.pointsHistory.findMany({
        where: {
            FactID: factId,
            points: {
                lt: 0
            },
            pointsSemester: semester
        }
    })

    return penaltyPoints;
}

export async function getUsersPenaltyPointsYear(factId: string) {
    const year = new Date().getFullYear().toString()
    const penaltyPoints = await db.pointsHistory.findMany({
        where: {
            FactID: factId,
            points: {
                lt: 0
            },
            pointsYear: year
        }
    })

    return penaltyPoints;
}

export async function getUsersBonusPoints(factId: string) {
    const BonusPoints = await db.pointsHistory.findMany({
        where: {
            FactID: factId,
            points: {
                gt: 0
            }
        }
    })

    return BonusPoints;
}

export async function getUsersBonusPointsSemester(factId: string, semester: string) {
    const BonusPoints = await db.pointsHistory.findMany({
        where: {
            FactID: factId,
            points: {
                gt: 0
            },
            pointsSemester: semester
        }
    })

    return BonusPoints;
}

export async function getUsersBonusPointsYear(factId: string) {
    const year = new Date().getFullYear().toString()
    const BonusPoints = await db.pointsHistory.findMany({
        where: {
            FactID: factId,
            points: {
                gt: 0
            },
            pointsYear: year
        }
    })

    return BonusPoints;
}