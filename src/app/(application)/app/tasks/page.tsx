"use client";

import React, { useState, useEffect } from "react";
import { TasksGet } from "@/lib/TaskOperations";
import { SessionProvider, useSession } from "next-auth/react";
import { getUserPendingTasks, getUserCompletedTasks } from "@/lib/UserFetch";
import Link from "next/link";

interface CompletedTask {
  tasknum: number;
  taskname: string;
  awarded: number;
  points: number;
}

interface Task {
  status: string;
  TaskId: string;
  task: string;
}

interface TaskListPage {
  id: string;
  TaskId: string;
  task: string;
  fileKey: string | null;
  description: string;
  points: number;
  domain: string;
  startDate: string;
  deadline: string;
  duration: string;
}

const TaskListPage: React.FC = () => {
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [submittedTasks, setSubmittedTasks] = useState<CompletedTask[]>([]);
  const [remainingTasks, setRemainingTasks] = useState<Task[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const [TaskLists, setTaskLists] = useState<TaskListPage[]>([]);

  useEffect(() => {
    const fetchTaskData = async () => {
      if (status === "authenticated" && session && session.user) {
        const UserDat = session.user as {
          name: string;
          email: string;
          role: string;
          image: string;
          factId: string;
          domain: string;
        };
        setUserRole(UserDat.role);

        const fetchedTaskLists = await TasksGet(UserDat.domain.toLowerCase());
        setTaskLists(fetchedTaskLists);

        const pendingTasksList = (await getUserPendingTasks(UserDat.factId))[0];
        const completedTasksList = (await getUserCompletedTasks(UserDat.factId))[0];

        const finalPendingArr: Task[] = pendingTasksList
          .filter((task) => task !== null)
          .map((task) => {
            const taskData = fetchedTaskLists.find((t) => t.TaskId === task.taskId);
            return taskData ? { ...taskData, status: "started" } : null;
          }).filter(Boolean) as Task[];

        setPendingTasks(finalPendingArr);

        const finalCompletedArr: CompletedTask[] = completedTasksList.map((task, index) => {
          const taskData = fetchedTaskLists.find((t) => t.TaskId === task.taskId);
          return taskData ? {
            tasknum: index + 1,
            taskname: taskData.task,
            awarded: task.awarded,
            points: taskData.points,
          } : null;
        }).filter((task): task is CompletedTask => task !== null);

        setSubmittedTasks(finalCompletedArr);

        const remainingTasks = fetchedTaskLists.filter((task) => {
          const pendingTask = pendingTasksList.find((t) => t.taskId === task.TaskId);
          const completedTask = completedTasksList.find((t) => t.taskId === task.TaskId);
          return !pendingTask && !completedTask;
        }).map(task => ({ ...task, status: "Available" }));

        setRemainingTasks(remainingTasks);
      }
    };
    fetchTaskData();
  }, [status, session]);

  return (
    <div>
      {userRole === "member" && (
        <div className="flex justify-center items-center min-h-screen p-4">
          <div className="grid grid-cols-2 gap-4 w-full h-screen">
            <div className="border rounded-lg mb-10 border-gray-300 p-4 bg-slate-600 shadow-md ml-3">
              <h2 className="text-xl font-bold mb-4 text-center">
                Pending Tasks
              </h2>
              {pendingTasks.map((task) => (
                <Link key={task.TaskId} href={`/app/tasks/${task.TaskId}`}>
                  <div className="mb-2 p-4 border border-gray-300">
                    <h3 className="font-bold">{task.task}</h3>
                    <p>Status: {task.status}</p>
                  </div>
                </Link>
              ))}
              {remainingTasks.map((task) => (
                <Link key={task.TaskId} href={`/app/tasks/${task.TaskId}`}>
                  <div className="mb-2 p-4 border border-gray-300">
                    <h3 className="font-bold">{task.task}</h3>
                    <p>Status: {task.status}</p>
                  </div>
                </Link>
              ))}
              {(pendingTasks.length + remainingTasks.length) === 0 && (
                <p className="text-center">No tasks available</p>
              )}
            </div>
            <div className="border rounded-lg border-gray-300 p-4 mb-10 bg-slate-600 shadow-md">
              <h2 className="text-xl font-bold mb-4 text-center">
                Submitted Tasks
              </h2>
              <table className="flex flex-col min-w-full">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left">num</th>
                    <th className="py-2 px-4 text-left">taskname</th>
                    <th className="py-2 px-4 text-left">Points</th>
                    <th className="py-2 px-4 text-left">Awarded</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedTasks.map((entry: any, index: number) => (
                    <tr key={index} className="hover:bg-blue-300">
                      <td className="px-4 py-2">{entry.tasknum}</td>
                      <td className="px-4 py-2">{entry.taskname}</td>
                      <td className="px-4 py-2">{entry.points}</td>
                      <td className="px-4 py-2">{entry.awarded}</td>
                      <td className="px-4 py-2">{entry.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {(userRole === "moderator" || userRole === "president") && (
        <div className="grid grid-cols-1 gap-4">
          {TaskLists.map((task: TaskListPage, index: number) => (
            <button
              key={index}
              className="border rounded-lg p-4 bg-white shadow-md"
            >
              <h3 className="font-bold">{task.task}</h3>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function TasksPage() {
  return (
    <SessionProvider>
      <TaskListPage />
    </SessionProvider>
  );
}
