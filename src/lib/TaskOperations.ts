"use server"

import { db } from "@/lib/db";
import { TaskIdGen } from "@/functions/taskIdgen";

export async function TaskCreate(taskName: string, taskDescription: string, pointsGiven: number, domain: string, taskStartTime: string, taskDeadline: string, duration: string, creator: string, key?: string | null) {
    let taskId = TaskIdGen();
    let task = await db.tasks.findFirst({
        where: {
            TaskId: taskId
        }
    });
    while (task) {
        taskId = TaskIdGen();
        task = await db.tasks.findFirst({
            where: {
                TaskId: taskId
            }
        });
    }

    // create the task
    await db.tasks.create({
        data: {
            TaskId: taskId,
            task: taskName,
            description: taskDescription,
            points: +pointsGiven,
            domain: domain,
            startDate: taskStartTime,
            deadline: taskDeadline,
            duration: duration,
            fileKey: key || null,
            creator: creator
        }
    })

    return taskId;
}

export async function TaskGetById(taskId: string) {
    const task = await db.tasks.findUnique({
        where: {
            TaskId: taskId
        }
    });

    return task;
}

export async function TasksGet(domain: string) {
    var tasks = await db.tasks.findMany({
        where: {
            OR: [
                { domain: domain },
                { domain: "common" }
            ]
        }
    });

    tasks = tasks.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    return tasks;
}

export async function TaskDelete(taskId: string) {
    // check if task exists
    const task = await db.tasks.findFirst({
        where: {
            TaskId: taskId
        }
    });

    if (!task) {
        throw new Error("Task does not exist");
    } else {
        await db.tasks.delete({
            where: {
                TaskId: taskId
            }
        });
    }
}

export async function TaskStart(factId: string, taskId: string) {
    const pointsData = await db.points.findFirst({
        where: {
            FactID: factId
        }
    });
    if (!pointsData) return null;
    const newPendingTask = await db.pendingTask.create({
        data: {
            taskId: taskId,
            FactID: factId,
            startTime: new Date().toISOString(),
            pointsId: pointsData.id,
        }
    });

}

export async function isTaskPending(factId: string, taskId: string) {
    const pointsData = await db.points.findUnique({
        where: {
            FactID: factId,
        },
        include: {
            pendingTasks: true
        }
    });
    return pointsData?.pendingTasks.find((task) => task.taskId === taskId);
}

export async function isTaskCompleted(factId: string, taskId: string) {
    const pointsData = await db.points.findUnique({
        where: {
            FactID: factId,
        },
        include: {
            completedTasks: true
        }
    });
    return pointsData?.completedTasks.find((task) => task.taskId === taskId);
}

export async function getAllCompletedTasks(taskId: string) {
    const completedTasks = await db.completedTask.findMany({
        where: {
            taskId: taskId
        }
    });
    return completedTasks;
}

export async function markTaskasComplete(factId: string, taskId: string, filekey?: string) {
    const pendingTask = await db.pendingTask.findFirst({
        where: {
            taskId: taskId,
            FactID: factId
        }
    });

    if (!pendingTask) return null;

    await db.pendingTask.delete({
        where: {
            id: pendingTask.id
        }
    });


    const pointsData = await db.points.findFirst({
        where: {
            FactID: factId
        }
    });
    if (!pointsData) return null;
    await db.completedTask.create({
        data: {
            taskId: taskId,
            FactID: factId,
            completeTime: new Date().toISOString(),
            pointsId: pointsData.id,
            status: "pending",
            Filekey: filekey || null
        }
    });
}

export async function TasksSubmitted(taskId: string) {
    var completedTasks = await db.completedTask.findMany({
        where: {
            taskId: taskId
        }
    });
    completedTasks = completedTasks.sort((a, b) => {
        if (a.status === "validating" && b.status !== "validating") {
            return -1;
        } else if (a.status !== "validating" && b.status === "validating") {
            return 1;
        } else {
            return 0;
        }
    });
    return completedTasks;
}

export async function markTaskasValidating(factId: string, taskId: string) {
    const completedTask = await db.completedTask.findFirst({
        where: {
            taskId: taskId,
            FactID: factId
        }
    });

    if (!completedTask) return null;

    await db.completedTask.update({
        where: {
            id: completedTask.id
        },
        data: {
            status: "validating"
        }
    });
}

export async function isTaskValidating(factId: string, taskId: string) {
    const pointsData = await db.points.findUnique({
        where: {
            FactID: factId,
        },
        include: {
            completedTasks: true
        }
    });
    if (pointsData?.completedTasks.find((task) => task.taskId === taskId && task.status === "validating")) {
        return true;
    } else {
        return false;
    }
}

export async function isTaskComplete(factId: string, taskId: string) {
    const pointsData = await db.points.findUnique({
        where: {
            FactID: factId,
        },
        include: {
            completedTasks: true
        }
    });
    if (pointsData?.completedTasks.find((task) => task.taskId === taskId && task.status === "completed")) {
        return true;
    } else {
        return false;
    }
}

export async function AwardMarks(taskId: string, factId: string, points: number) {
    const completedTask = await db.completedTask.findFirst({
        where: {
            taskId: taskId,
            FactID: factId
        }
    });

    const userData = await db.user.findUnique({
        where: {
            FactID: factId
        }
    });

    const semester = userData?.semester || "0";

    if (!completedTask) return null;

    await db.completedTask.update({
        where: {
            id: completedTask.id
        },
        data: {
            status: "completed",
            awarded: points,
            submissionYear: new Date().getFullYear().toString(),
            submissionSemester: semester,
            completeTime: new Date().toISOString()
        }
    });

    const pointsData = await db.points.findFirst({
        where: {
            FactID: factId
        }
    });

    if (!pointsData) return null;

    await db.points.update({
        where: {
            id: pointsData.id
        },
        data: {
            points: {
                increment: points
            }
        }
    });
}

// Leaderboard calls

import { getUsersPenaltyPoints, getUsersPenaltyPointsSemester, getUsersPenaltyPointsYear, getUsersBonusPoints, getUsersBonusPointsSemester, getUsersBonusPointsYear } from "@/lib/UserOperations"

export async function getLifetimePoints(factId: string) {
    const output = await db.completedTask.findMany({ where: { FactID: factId, status: 'completed' } });

    const penaltyPoints = await getUsersPenaltyPoints(factId);
    const bonusPoints = await getUsersBonusPoints(factId);

    var points = 0;
    const list = await Promise.all(output.map(async (task) => {
        const taskData = await db.tasks.findUnique({ where: { TaskId: task.taskId } });
        points += task.awarded || 0;
        return {
            ...task,
            task: taskData?.task || ""
        }
    }));

    points += bonusPoints;
    points += penaltyPoints;
    return { list, points };
}

export async function getYearPoints(factId: string) {
    const output = await db.completedTask.findMany({ where: { FactID: factId, status: 'completed', submissionYear: new Date().getFullYear().toString() } });

    const penaltyPoints= await getUsersPenaltyPointsYear(factId);
    const bonusPoints = await getUsersBonusPointsYear(factId);

    var yearpoints = 0;
    const yearlist = await Promise.all(output.map(async (task) => {
        const taskData = await db.tasks.findUnique({ where: { TaskId: task.taskId } });
        yearpoints += task.awarded || 0;
        return {
            ...task,
            task: taskData?.task || ""
        }
    }));

    yearpoints += bonusPoints;
    yearpoints += penaltyPoints;

    return { yearlist, yearpoints };
}

export async function getSemesterPoints(factId: string) {
    const userdata = await db.user.findUnique({
        where: {
            FactID: factId
        }
    });
    const semester = userdata?.semester || "0";
    const output = await db.completedTask.findMany({ where: { FactID: factId, status: 'completed', submissionSemester: semester } });

    const penaltyPoints = await getUsersPenaltyPointsSemester(factId, semester);
    const bonusPoints = await getUsersBonusPointsSemester(factId, semester);

    var sempoints = 0;
    const semlist = await Promise.all(output.map(async (task) => {
        const taskData = await db.tasks.findUnique({ where: { TaskId: task.taskId } });
        sempoints += task.awarded || 0;
        return {
            ...task,
            task: taskData?.task || ""
        }
    }));

    sempoints += bonusPoints;
    sempoints += penaltyPoints;

    return { semlist, sempoints };
}