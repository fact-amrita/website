"use client";

import React, { useState, useEffect } from "react";
import { TasksGet } from "@/lib/TaskOperations";
import { SessionProvider, useSession } from "next-auth/react";
import { getUserPendingTasks, getUserCompletedTasks } from "@/lib/UserFetch";
import Link from "next/link";
import TaskValidation from "@/components/tasks/TaskValidation";

interface CompletedTask {
  tasknum: number;
  taskname: string;
  awarded: number;
  points: number;
  status: string;
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
  const [userDomain, setuserDomain] = useState<string | null>(null);
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
        setuserDomain(UserDat.domain.toLowerCase());

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
            awarded: task.awarded || 0,
            points: taskData.points,
            status: task.status
          } : null;
        }).filter((task): task is CompletedTask => task !== null);

        setSubmittedTasks(finalCompletedArr);

        var remainingTasks = fetchedTaskLists.filter((task) => {
          const pendingTask = pendingTasksList.find((t) => (t.taskId === task.TaskId));
          const completedTask = completedTasksList.find((t) => t.taskId === task.TaskId);
          return !pendingTask && !completedTask;
        }).map(task => ({ ...task, status: "Available" }));
        const today = new Date();
        remainingTasks = remainingTasks.filter(task => {
          const deadline = new Date(task.deadline);
          return deadline >= today;
        });
        remainingTasks = remainingTasks.filter(task => {
          const startDate = new Date(task.startDate);
          return startDate <= today;
        });
        setRemainingTasks(remainingTasks);
      }
    };
    fetchTaskData();
  }, [status, session]);

  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 via-red-500 to-purple-500 p-4 flex flex-col lg:flex-row px-12 md:px-16">
      {userRole === "member" && (
        <>
          <div className="lg:w-1/2 flex-1 border rounded-lg mb-10 border-gray-300 p-4 bg-slate-600 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center text-white">
              Pending Tasks
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {pendingTasks.map((task) => (
                <Link key={task.TaskId} href={`/app/tasks/${task.TaskId}`}>
                  <div className="mb-2 p-4 border border-gray-300 bg-white">
                    <h3 className="font-bold">{task.task}</h3>
                    <p>Status: {task.status}</p>
                  </div>
                </Link>
              ))}
              {remainingTasks.map((task) => (
                <Link key={task.TaskId} href={`/app/tasks/${task.TaskId}`}>
                  <div className="mb-2 p-4 border border-gray-300 bg-white">
                    <h3 className="font-bold">{task.task}</h3>
                    <p>Status: {task.status}</p>
                  </div>
                </Link>
              ))}
              {(pendingTasks.length + remainingTasks.length) === 0 && (
                <p className="text-center text-white">No tasks available</p>
              )}
            </div>
          </div>
          <div className="lg:w-1/2 flex-1 border rounded-lg border-gray-300 p-4 mb-10 bg-slate-600 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center text-white">
              Submitted Tasks
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 text-left">No.</th>
                    <th className="py-2 px-4 text-left">Task Name</th>
                    <th className="py-2 px-4 text-left">Points</th>
                    <th className="py-2 px-4 text-left">Awarded</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedTasks.map((entry: CompletedTask, index: number) => (
                    <tr key={index} className="hover:bg-blue-200">
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
            {submittedTasks.length === 0 && (
              <p className="text-center text-white">No tasks submitted yet</p>
            )}
          </div>
        </>)}
      {(userRole === "moderator" || userRole === "president") && (
        <TaskValidation domain={userDomain || ""} />
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
