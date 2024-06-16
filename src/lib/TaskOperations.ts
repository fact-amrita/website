"use server"

import { db } from "@/lib/db";
import { TaskIdGen } from "@/functions/taskIdgen";

export async function TaskCreate(taskName: string, taskDescription: string, pointsGiven: number, domain: string, taskStartTime: string, taskDeadline: string, duration: string) {
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
            duration: duration
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
            domain: domain
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