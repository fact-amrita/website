'use client';

import React, { useState, useEffect } from 'react';
import { TasksGet } from '@/lib/TaskOperations';
import { SessionProvider, useSession } from 'next-auth/react';
import { getUserPendingTasks, getUserCompletedTasks } from '@/lib/UserFetch';
import Link from 'next/link';

interface CompletedTask {
  tasknum: number;
  taskname: string;
  awarded: number;
  points: number;
  status: "Submitted" | "Reviewing" | "Reviewed";
}

interface Task {
  status: string;
  TaskId: string;
  task: string;
}

interface LeaderboardEntry {
  num: number;
  taskname: string;
  points: number;
  submit: "submitted" | "not submitted";
}

const TaskListPage: React.FC = () => {
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [submittedTasks, setSubmittedTasks] = useState<CompletedTask[]>([]);
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session && session.user) {
      const fetchTaskData = async () => {
        try {
          const UserDat = session.user as { name: string; email: string; role: string; image: string; factId: string; domain: string };
          const TaskLists = await TasksGet((UserDat.domain).toLowerCase());
          const userCompletedTasks = await getUserCompletedTasks(UserDat.factId);
          const userPendingTasks = await getUserPendingTasks(UserDat.factId);

          const pendingArr: Task[] = [];
          const submittedArr: CompletedTask[] = [];
          var tasknumber = 1;
          userCompletedTasks[0].forEach((task: {
            awarded: number; taskId: string 
}) => {
            const taskdata = TaskLists.find((taskdata) => taskdata.TaskId === task.taskId);
            if (taskdata) {
              console.log(task);
              submittedArr.push({ tasknum: tasknumber, taskname: taskdata.task, awarded: task.awarded || 0, points: taskdata.points, status: task.status });
              TaskLists.splice(TaskLists.indexOf(taskdata), 1);
              tasknumber += 1;
            }
          });

          setSubmittedTasks(submittedArr);

          if (userPendingTasks[0].length !== 0) {
            userPendingTasks[0].forEach((task: { taskId: string }) => {
              const taskdata = TaskLists.find((taskdata) => taskdata.TaskId === task.taskId);
              if (taskdata) {
                pendingArr.push({ task: taskdata.task, status: 'pending', TaskId: task.taskId });
                TaskLists.splice(TaskLists.indexOf(taskdata), 1);
              }
            });
          }

          TaskLists.forEach((task) => {
            const deadline = new Date(task.deadline);
            const durationDays = parseInt(task.duration);
            const deadlinePlusDuration = new Date(deadline.setDate(deadline.getDate() - durationDays + 1));
            if (deadlinePlusDuration > new Date() && new Date(task.startDate) <= new Date()) {
              pendingArr.push({ task: task.task, status: 'pending', TaskId: task.TaskId });
            }
          });

          setPendingTasks(pendingArr);
        } catch (error) {
          console.error('Error fetching task data:', error);
          setError('Failed to load tasks. Please try again later.');
        }
      };
      fetchTaskData();
    }
  }, [status, session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session || !session.user) {
    return <p>You need to be logged in to access your profile.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="grid grid-cols-2 gap-4 w-full h-screen ">
        <div className="border rounded-lg mb-10 border-gray-300 p-4 bg-slate-600 shadow-md ">
          <h2 className="text-xl font-bold mb-4 text-center">Pending Tasks</h2>
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task) => (
              <Link href={`/app/tasks/${task.TaskId}`}>
                <div key={task.TaskId} className="mb-2 p-4 border border-gray-300">
                  <h3 className="font-bold">{task.task}</h3>
                  <p>Status: {task.status}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No pending tasks to display.</p>
          )}
        </div>
        <div className="border rounded-lg border-gray-300 p-4 mb-10 bg-slate-600 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">Submitted Tasks</h2>
          <table className=" flex flex-col min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">num</th>
                <th className="py-2 px-4 text-left">taskanme</th>
                <th className="py-2 px-4 text-left">Points</th>
                <th className="py-2 px-4 text-left">Awarded</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {submittedTasks.map((entry: any) => (
                <tr key={entry.rank} className="hover:bg-blue-300">
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
  );
};

export default function TasksPage() {
  return (
    <SessionProvider>
      <TaskListPage />
    </SessionProvider>
  );
}
