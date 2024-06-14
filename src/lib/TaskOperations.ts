import { db } from "@/lib/db";
import { TaskIdGen } from "@/functions/taskIdgen";

export async function TaskCreate(taskName: string, taskDescription: string, points: number, domain: string, taskDeadline: string, duration: string) {
    // generate a task id and proceed if it does not exist in the database
    let taskId = TaskIdGen();
    let task = await db.tasks.findFirst({
        where: {
            id: taskId
        }
    });
    while (task) {
        taskId = TaskIdGen();
        task = await db.tasks.findFirst({
            where: {
                id: taskId
            }
        });
    }

    // create the task
    await db.tasks.create({
        data: {
            TaskId: taskId,
            task: taskName,
            description: taskDescription,
            points: points,
            domain: domain,
            deadline: taskDeadline,
            duration: duration
        }
    })

    return taskId;
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