'use client';
import React, { useState } from 'react';

const TaskListPage = () => {
  // Example arrays of pending and submitted tasks
  const pendingTasks = [
    { id: 1, title: 'Pending Task 1' },
    { id: 2, title: 'Pending Task 2' },
    { id: 3, title: 'Pending Task 3' },
    { id: 4, title: 'Pending Task 4' },
    { id: 5, title: 'Pending Task 5' },
    { id: 6, title: 'Pending Task 6' },
    { id: 7, title: 'Pending Task 7' },
    { id: 8, title: 'Pending Task 8' },
    { id: 9, title: 'Pending Task 9' },
    { id: 10, title: 'Pending Task 10' },
    { id: 11, title: 'Pending Task 11' },
    { id: 12, title: 'Pending Task 12' },
  ];

  const submittedTasks = [
    { id: 1, title: 'Submitted Task 1' },
    { id: 2, title: 'Submitted Task 2' },
    { id: 3, title: 'Submitted Task 3' },
    { id: 4, title: 'Submitted Task 4' },
    { id: 5, title: 'Submitted Task 5' },
    { id: 6, title: 'Submitted Task 6' },
    { id: 7, title: 'Submitted Task 7' },
    { id: 8, title: 'Submitted Task 8' },
    { id: 9, title: 'Submitted Task 9' },
    { id: 10, title: 'Submitted Task 10' },
    { id: 11, title: 'Submitted Task 11' },
    { id: 12, title: 'Submitted Task 12' },
  ];

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
            ? submittedTasks.map((task) => (
                <div key={task.id} className='w-1/3 p-4'>
                  <div className='bg-gray-100 border border-gray-300 p-4 rounded-md'>
                    {task.title}
                  </div>
                </div>
              ))
            : pendingTasks.map((task) => (
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

export default TaskListPage;
