'use client';

// pages/tasks/index.tsx

import React, { useState, useEffect } from 'react';
import { TasksGet } from '@/lib/TaskOperations'; // Adjust import path as per your project structure
import Link from 'next/link';
import { SessionProvider, useSession } from 'next-auth/react';
import { getUserPendingTasks, getUserCompletedTasks } from '@/lib/UserFetch';

interface Task {
  status: string;
  id: number;
  title: string;
}

const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<any>([]);
  const { data: session, status } = useSession();
  const [showSubmitted, setShowSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session && session.user) {
      const fetchTaskData = async () => {
        try {
          const UserDat = session.user as { name: string; email: string; role: string; image: string; factId: string; domain: string }
          const TaskLists = await TasksGet((UserDat.domain).toLowerCase());
          const userCompletedTasks = (await getUserCompletedTasks(UserDat.factId))[0];
          const userPendingTasks = (await getUserPendingTasks(UserDat.factId))[0];
          var newArr: any = []
          userCompletedTasks.forEach((task: { taskId: string; }) => {
            var taskdata = TaskLists.find((taskdata) => taskdata.TaskId === task.taskId) as { id: string; TaskId: string; task: string; description: string; points: number; domain: string; startDate: string; deadline: string; duration: string; }
            newArr.push({ task: taskdata?.task, status: 'submitted', TaskId: task.taskId })
            // remove from TaskLists array
            TaskLists.splice(TaskLists.indexOf(taskdata), 1)
          })

          console.log(userPendingTasks)

          if (userPendingTasks.length !== 0) {
            userPendingTasks.forEach((task: { taskId: string; }) => {
              var taskdata = TaskLists.find((taskdata) => taskdata.TaskId === task.taskId) as { id: string; TaskId: string; task: string; description: string; points: number; domain: string; startDate: string; deadline: string; duration: string; }
              newArr.push({ task: taskdata?.task, status: 'pending', TaskId: task.taskId })
              TaskLists.splice(TaskLists.indexOf(taskdata), 1)
            })
          }

          TaskLists.forEach(task => {
            const deadline = new Date(task.deadline);
            const durationDays = parseInt(task.duration);
            const deadlinePlusDuration = new Date(deadline.setDate(deadline.getDate() - durationDays));
            if (deadlinePlusDuration > new Date()) {
              if (new Date(task.startDate) <= new Date()) {
                newArr.push({ task: task.task, status: 'pending', TaskId: task.TaskId });
              }
            }
          });

          setTasks(newArr);

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

  const handleShowSubmitted = () => setShowSubmitted(true);
  const handleShowPending = () => setShowSubmitted(false);

  const displayedTasks = showSubmitted
    ? tasks.filter((task: { status: string; }) => task.status === 'submitted')
    : tasks.filter((task: { status: string; }) => task.status === 'pending');

  return (
    <div className='flex flex-col h-screen'>
      {/* Header with buttons */}
      <div className='bg-gray-200 p-4 flex justify-start items-center'>
        <button
          onClick={handleShowPending}
          className={`py-2 px-4 mr-2 text-gray-800 rounded ${!showSubmitted ? 'bg-gray-400' : ''}`}
        >
          Pending Tasks
        </button>
        <button
          onClick={handleShowSubmitted}
          className={`py-2 px-4 text-gray-800 rounded ${showSubmitted ? 'bg-gray-400' : ''}`}
        >
          Submitted Tasks
        </button>
      </div>

      {/* Main content area */}
      <div className='flex-grow bg-white p-4'>
        {error && (
          <div className='text-red-500 text-center mb-4'>{error}</div>
        )}
        <div className='text-center text-lg font-semibold mb-4'>
          {showSubmitted ? 'Submitted Tasks' : 'Pending Tasks'}
        </div>
        <div className='flex flex-wrap'>
          {displayedTasks.map((task: { id: React.Key | null | undefined; TaskId: any; task: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
            <div key={task.id} className='w-1/3 p-4'>
              <Link href={`/app/tasks/${task.TaskId}`} className='bg-gray-100 border border-gray-300 p-4 rounded-md'>
                {task.task}
              </Link>
            </div>
          ))}
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
