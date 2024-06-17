'use client';

// pages/tasks/index.tsx

import React, { useState, useEffect } from 'react';
import { TasksGet } from '@/lib/TaskOperations'; // Adjust import path as per your project structure
import Link from 'next/link';

import { SessionProvider, useSession } from 'next-auth/react';

interface Task {
  status: string;
  id: number;
  title: string;
}

const TaskListPage: React.FC = () => {
  const [showSubmitted, setShowSubmitted] = useState(false);

  const { data: session, status } = useSession();
  // const [tasks, setTaskData] = useState<any>(null);

  if (status === 'loading') {
    return <p></p>;
  }

  if (!session || !session.user) {
    return <p>You need to be logged in to access your profile.</p>;
  }

  const userdat = session.user as { name: string; email: string; role: string; image: string; factId: string; domain: string; };

  // useEffect(() => {
  //   const fetchTaskData = async () => {
  //     try {
  //       const tasksDat = await TasksGet(userdat.domain);
  //       if (!tasksDat) { setTaskData("not found"); return; }
  //       setTaskData(tasksDat);
  //     } catch (error) {
  //       console.error('Error fetching task data:', error);
  //     }
  //   };
  //   fetchTaskData();
  // });



  // const tasks = 

  const submittedTasks=[{
    status: 'submitted',
    id: 'dnqtv51t',
    title: 'test task 2'
  }]

  const pendingTasks=[{
    status: 'pending',
    id: 'fyf19d5v',
    title: 'test task 1'
  }]

  const handleShowSubmitted = () => {
    setShowSubmitted(true);
  };

  const handleShowPending = () => {
    setShowSubmitted(false);
  };

  return (
    <div className='flex flex-col h-screen'>
      {/* Header with buttons */}
      <div className='bg-gray-200 p-4 flex justify-start items-center'>
        <button
          onClick={handleShowPending}
          className={`py-2 px-4 mr-2 text-gray-800 rounded ${!showSubmitted ? 'bg-gray-400' : ''
            }`}
        >
          Pending Tasks
        </button>
        <button
          onClick={handleShowSubmitted}
          className={`py-2 px-4 text-gray-800 rounded ${showSubmitted ? 'bg-gray-400' : ''
            }`}
        >
          Submitted Tasks
        </button>
      </div>

      {/* Main content area */}
      <div className='flex-grow bg-white p-4'>
        <div className='text-center text-lg font-semibold mb-4'>
          {showSubmitted ? 'Submitted Tasks' : 'Pending Tasks'}
        </div>
        <div className='flex flex-wrap'>
          {showSubmitted
            ? submittedTasks
              .filter(task => task.status === 'submitted')
              .map((task) => (
                <div key={task.id} className='w-1/3 p-4'>
                  <Link href={`/app/tasks/${task.id}`} className='bg-gray-100 border border-gray-300 p-4 rounded-md'>
                    {task.title}
                  </Link>
                </div>
              ))
            : pendingTasks
              .filter(task => task.status === 'pending')
              .map((task) => (
                <div key={task.id} className='w-1/3 p-4'>
                  <Link href={`/app/tasks/${task.id}`} className='bg-gray-100 border border-gray-300 p-4 rounded-md'>
                    {task.title}
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default function tasksPage() {
  return (
    <SessionProvider>
      <TaskListPage />
    </SessionProvider>
  )
}
