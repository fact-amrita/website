'use client';

// pages/tasks/index.tsx

import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { TasksGet } from '@/lib/TaskOperations'; // Adjust import path as per your project structure

interface Task {
  status: string;
  id: number;
  title: string;
}

const TaskListPage: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  const [showSubmitted, setShowSubmitted] = useState(false);

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
          className={`py-2 px-4 mr-2 text-gray-800 rounded ${
            !showSubmitted ? 'bg-gray-400' : ''
          }`}
        >
          Pending Tasks
        </button>
        <button
          onClick={handleShowSubmitted}
          className={`py-2 px-4 text-gray-800 rounded ${
            showSubmitted ? 'bg-gray-400' : ''
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
            ? tasks
                .filter(task => task.status === 'submitted')
                .map((task) => (
                  <div key={task.id} className='w-1/3 p-4'>
                    <div className='bg-gray-100 border border-gray-300 p-4 rounded-md'>
                      {task.title}
                    </div>
                  </div>
                ))
            : tasks
                .filter(task => task.status === 'pending')
                .map((task) => (
                  <div key={task.id} className='w-1/3 p-4'>
                    <div className='bg-gray-100 border border-gray-300 p-4 rounded-md'>
                      {task.title}
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const tasks = await TasksGet('localhost'); // Fetch all tasks from database
    return { props: { tasks } };
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return { props: { tasks: [] } };
  }
};

export default TaskListPage;
