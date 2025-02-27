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

export async function assignRole(factId: string, role: string) {
    try {
        const output = await db.user.update({
            where: {
                FactID: factId
            },
            data: {
                role: role
            }
        })

        await db.userCredential.update({
            where: {
                email: output.email
            },
            data: {
                role: role
            }
        })
    } catch (e) {
        return false
    }
    return true;
}

export async function assignTitle(factId: string, title: string) {
    try {
        await db.user.update({
            where: {
                FactID: factId
            },
            data: {
                Title: title
            }
        })
    } catch (e) {
        return false
    }
    return true;
}

export async function updateProfile(factId: string, formData: {
    Name: string;
    LinkedinProfile: string;
    GithubProfile: string;
    About: string;
    Skills: string[];
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
                Skills: formData.Skills
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

export async function makeMember(email: string, creator: string) {
    const userdata = await db.userCredential.findUnique({
        where: {
            email: email
        }
    })

    await db.logs.create({
        data: {
            Date: new Date().toISOString(),
            Log: `Newbie ${userdata?.name} was allowed into the club`,
            Creator: creator
        }
    })

    await db.userCredential.update({
        where: {
            email: email
        },
        data: {
            role: "onboarding"
        }
    })
}

export async function deleteUser(email: string, creator: string) {
    const userdata = await db.userCredential.findUnique({
        where: {
            email: email
        }
    })

    await db.logs.create({
        data: {
            Date: new Date().toISOString(),
            Log: `Newbie ${userdata?.name} was not allowed to join the club`,
            Creator: creator
        }
    })

    await db.userCredential.delete({
        where: {
            email: email
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
                pointsYear: (new Date().getFullYear()).toString(),
                DateTime: new Date().toISOString()
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
    const penaltyPointsList = await db.pointsHistory.findMany({
        where: {
            FactID: factId,
            points: {
                lt: 0
            }
        }
    })

    var penaltyPoints = 0;
    penaltyPointsList.forEach(point => {
        penaltyPoints += point.points
    });

    return penaltyPoints;
}

export async function getUsersPenaltyPointsSemester(factId: string, semester: string) {
    const penaltyPointsList = await db.pointsHistory.findMany({
        where: {
            FactID: factId,
            points: {
                lt: 0
            },
            pointsSemester: semester
        }
    })

    var penaltyPoints = 0;
    penaltyPointsList.forEach(point => {
        penaltyPoints += point.points
    });

    return penaltyPoints;
}

export async function getUsersPenaltyPointsYear(factId: string) {
    const year = new Date().getFullYear().toString()
    const penaltyPointsList = await db.pointsHistory.findMany({
        where: {
            FactID: factId,
            points: {
                lt: 0
            },
            pointsYear: year
        }
    })

    var penaltyPoints = 0;
    penaltyPointsList.forEach(point => {
        penaltyPoints += point.points
    });

    return penaltyPoints;
}

export async function getUsersBonusPoints(factId: string) {
    const BonusPointsList = await db.pointsHistory.findMany({
        where: {
            FactID: factId,
            points: {
                gt: 0
            }
        }
    })

    var BonusPoints = 0;
    BonusPointsList.forEach(point => {
        BonusPoints += point.points
    });

    return BonusPoints;
}

export async function getUsersBonusPointsSemester(factId: string, semester: string) {
    const BonusPointsList = await db.pointsHistory.findMany({
        where: {
            FactID: factId,
            points: {
                gt: 0
            },
            pointsSemester: semester
        }
    })
    var BonusPoints = 0;
    BonusPointsList.forEach(point => {
        BonusPoints += point.points
    });

    return BonusPoints;
}

export async function getUsersBonusPointsYear(factId: string) {
    const year = new Date().getFullYear().toString()
    const BonusPointsList = await db.pointsHistory.findMany({
        where: {
            FactID: factId,
            points: {
                gt: 0
            },
            pointsYear: year
        }
    })
    var BonusPoints = 0;
    BonusPointsList.forEach(point => {
        BonusPoints += point.points
    });

    return BonusPoints;
}

export async function YearBonusPenaltyList(factId: string) {
    const year = new Date().getFullYear().toString()
    const BonusPointsList = await db.pointsHistory.findMany({
        where: {
            FactID: factId,
            pointsYear: year
        },
        orderBy: {
            DateTime: "desc"
        }
    })

    var BonusPointsListNew: { number: number; points: number; date: string; description: string; }[] = []
    var i = 1
    BonusPointsList.forEach(pointData => {
        var point = pointData.points
        var date = pointData.DateTime
        var description = pointData.reason
        BonusPointsListNew.push({ number: i, points: point, date: date, description: description })
        i++
    });

    return BonusPointsListNew;
}

export async function SemesterBonusPenaltyList(factId: string) {

    const userData = await db.user.findUnique({
        where: {
            FactID: factId
        }
    });

    const BonusPointsList = await db.pointsHistory.findMany({
        where: {
            FactID: factId,
            pointsSemester: userData?.semester || "1"
        },
        orderBy: {
            DateTime: "desc"
        }
    })

    var BonusPointsListNew: { number: number; points: number; date: string; description: string; }[] = []
    var i = 1
    BonusPointsList.forEach(pointData => {
        var point = pointData.points
        var date = pointData.DateTime
        var description = pointData.reason
        BonusPointsListNew.push({ number: i, points: point, date: date, description: description })
        i++
    });

    return BonusPointsListNew;
}

export async function LifetimeBonusPenaltyList(factId: string) {
    const BonusPointsList = await db.pointsHistory.findMany({
        where: {
            FactID: factId
        },
        orderBy: {
            DateTime: "desc"
        }
    })

    var BonusPointsListNew: { number: number; points: number; date: string; description: string; }[] = []
    var i = 1
    BonusPointsList.forEach(pointData => {
        var point = pointData.points
        var date = pointData.DateTime
        var description = pointData.reason
        BonusPointsListNew.push({ number: i, points: point, date: date, description: description })
        i++
    });
    return BonusPointsListNew;
}



export async function updateProfileRemark(factId: string, remark: string) {
    try {
        await db.user.update({
            where: {
                FactID: factId
            },
            data: {
                ProfileRemark: remark
            }
        })
    } catch (e) {
        return false
    }
    return true;
}

export async function updateRating(factId: string, rating: number) {
    try {
        await db.user.update({
            where: {
                FactID: factId
            },
            data: {
                ClubRating: rating
            }
        })
    } catch (e) {
        console.log(e);
        return false
    }
    return true;
}

export async function deleteMember(factId: string, deleter: string) {
    try {
        const userdat = await db.user.findUnique({
            where: {
                FactID: factId
            }
        })

        if (!userdat) {
            return false
        }

        await db.userCredential.delete({
            where: {
                email: userdat.email
            }
        })

        await db.user.delete({
            where: {
                FactID: factId
            }
        })

        await db.points.delete({
            where: {
                FactID: factId
            }
        })

        await db.pointsHistory.deleteMany({
            where: {
                FactID: factId
            }
        })

        await db.completedTask.deleteMany({
            where: {
                FactID: factId
            }
        })

        await db.logs.create({
            data: {
                Date: new Date().toISOString(),
                Log: `User ${userdat.name} was deleted`,
                Creator: deleter
            }
        })

        return true
    } catch (e) {
        console.log(e)
        return false
    }
}