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
    const tasks = await db.tasks.findMany({
        where: {
            OR: [
                { domain: domain },
                { domain: "common" }
            ]
        }
    });

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

export async function TaskSubmitted(taskId: string) {
    const completedTasks = await db.completedTask.findMany({
        where: {
            taskId: taskId
        }
    });

    return completedTasks;
}

export async function markTaskasValidating(taskId: string, factId: string) {
    const completedTask = await db.completedTask.findFirst({
        where: {
            taskId: taskId,
            factID: factId
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

export async function AwardMarks(taskId: string, factId: string, points: number) {
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
            status: "completed",
            awarded: points
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