'use client';

import React, { useEffect, useState } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { TaskGetById } from "@/lib/TaskOperations";

const FileUpload = () => {
  const [showButton, setShowButton] = useState(true);

  const handleFileUpload = () => {
    console.log('File uploaded!');
  };

  const toggleDisplay = () => {
    setShowButton(!showButton);
  };

  return (
    <div className="w-full h-full bg-gray-700 flex justify-center items-center">
      <div className="w-3/4 h-3/4 bg-gray-500 rounded-lg flex flex-col justify-center items-center">
        {showButton ? (
          <button onClick={handleFileUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload File
          </button>
        ) : (
          <p className="text-gray-500">File upload is not needed.</p>
        )}
        <button onClick={toggleDisplay} className="mt-4">Toggle Display</button>
      </div>
    </div>
  );
};

type TaskPageProps = {
  TaskId: string;
};

type TaskData = {
  TaskId: string;
  task: string;
  description: string;
  points: number;
  domain: string;
  startDate: string;
  deadline: string;
  duration: number;
};

const TaskPage: React.FC<TaskPageProps> = ({ TaskId }) => {
  const { data: session, status } = useSession();
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const data = await TaskGetById(TaskId);
        if (!data) {
          setTaskData(null);
          return;
        }
        setTaskData(data);

        // Calculate time left only once when task data is fetched
        const deadlineTime = new Date(data.deadline).getTime();
        const currentTime = new Date().getTime();
        const initialTimeLeft = Math.max(0, Math.floor((deadlineTime - currentTime) / 1000));
        
        setTimeLeft(initialTimeLeft);
        
        // Start timer automatically if there's time left
        if (initialTimeLeft > 0) {
          setIsRunning(true);
        }
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };
    fetchTaskData();
  }, [TaskId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTimeLeft = prevTime - 1;
          if (newTimeLeft <= 0) {
            setIsRunning(false);
            clearInterval(timer);
          }
          return newTimeLeft;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  if (!taskData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-screen p-0 m-0">
      <div className="w-1/2 h-full bg-gray-800 flex flex-col justify-center items-center p-4">
      <div className="bg-gradient-to-tr from-blue-700 via-black to-red-700 rounded-md shadow-lg p-4 text-white font-mono text-lg mb-5">
          {timeLeft !== null ? (isRunning ? formatTime(timeLeft) : 'Timer Stopped') : 'Loading...'}
        </div>
        <div className="w-3/4 h-auto bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-700 mb-4">
          <div className="flex flex-col space-y-4">
            <p className="text-green-500 font-semibold text-lg">Task ID: <span className="font-normal">{taskData.TaskId}</span></p>
            <p className="text-green-500 font-semibold text-lg">Task: <span className="font-normal">{taskData.task}</span></p>
            <p className="text-green-500 font-semibold text-lg">Description: <span className="font-normal">{taskData.description}</span></p>
            <p className="text-green-500 font-semibold text-lg">Points: <span className="font-normal">{taskData.points}</span></p>
            <p className="text-green-500 font-semibold text-lg">Domain: <span className="font-normal">{taskData.domain}</span></p>
            <p className="text-green-500 font-semibold text-lg">Start Date: <span className="font-normal">{taskData.startDate}</span></p>
            <p className="text-green-500 font-semibold text-lg">Deadline: <span className="font-normal">{taskData.deadline}</span></p>
            <p className="text-green-500 font-semibold text-lg">Duration: <span className="font-normal">{taskData.duration} Day(s)</span></p>
            <button
              className={`bg-gradient-to-tr from-blue-700 via-black to-red-700 text-white font-semibold py-2 px-4 rounded ${isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
              onClick={isRunning ? stopTimer : startTimer}
              disabled={isRunning}
            >
              {isRunning ? 'Running...' : 'Take Action'}
            </button>
          </div>
        </div>
      </div>

      <div className="w-1/2 h-full bg-gray-700 flex justify-center items-center">
        <FileUpload />
      </div>
    </div>
  );
};

const TaskPageWrapper = ({ params }: { params: { id: string } }) => {
  return (
    <SessionProvider>
      <TaskPage TaskId={params.id} />
    </SessionProvider>
  );
};

export default TaskPageWrapper;
