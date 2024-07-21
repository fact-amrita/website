'use client';

import React, { useEffect, useState } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { TaskStart, TaskGetById, isTaskPending, isTaskCompleted } from "@/lib/TaskOperations";
import FileUpload from '@/components/tasks/fileupload';
import Link from 'next/link';

type TaskPageProps = {
  TaskId: string;
};

type TaskData = {
  TaskId: string;
  task: string;
  description: string;
  points: number;
  startDate: string;
  deadline: string;
  duration: string;
  fileKey: string | null;
};

const TaskPage: React.FC<TaskPageProps> = ({ TaskId }) => {
  const { data: session, status } = useSession();
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [userdata, setUserDat] = useState<any>(null);
  const [taskid, setTaskid] = useState(TaskId);
  const [factId, setFactId] = useState(localStorage.getItem('factId'));
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const data = await TaskGetById(TaskId);
        if (!data) {
          setTaskData(null);
          return;
        }
        setTaskData(data);

        const pendingTaskCheck = factId ? await isTaskPending(factId, TaskId) : null;
        const completedTaskCheck = factId ? await isTaskCompleted(factId, TaskId) : null;

        if (completedTaskCheck) {
          setTaskCompleted(true);
        }

        if (pendingTaskCheck) {
          const startTime = new Date(pendingTaskCheck.startTime);
          const duration = data.duration;
          const endtime = new Date(startTime.getTime() + Number(duration) * 24 * 60 * 60 * 1000);
          const currentTime = new Date().getTime();
          const timefromduration = Math.max(0, Math.floor((endtime.getTime() - currentTime) / 1000));
          const timefromdeadline = Math.max(0, Math.floor((new Date(data.deadline).getTime() - currentTime) / 1000));

          const initialTimeLeft = Math.min(timefromduration, timefromdeadline);
          setTimeLeft(initialTimeLeft);
          if (initialTimeLeft > 0) {
            setIsRunning(true);
          }
        }
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };
    fetchTaskData();
  }, [TaskId, factId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime !== null) {
            const newTimeLeft = prevTime - 1;
            if (newTimeLeft <= 0) {
              setIsRunning(false);
              clearInterval(timer);
            }
            return newTimeLeft;
          }
          return null;
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

  if (status === 'loading') {
    return <p></p>; // Suspense content can be added here
  }

  if (!session || !session.user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">You need to be logged in to access your profile.</div>
      </div>
    );
  }

  if (!taskData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">Task not found</div>
      </div>
    );
  }

  if (taskCompleted) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">This Task has already been submitted</div>
        <div className="text-red-500 text-xl"><Link href="/app/tasks">Go to <span style={{ textDecoration: "underline" }}>task list</span> to check the task status</Link></div>
      </div>
    );
  }

  if (taskData?.startDate && new Date(taskData.startDate) > new Date()) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">Task has not been started yet</div>
      </div>
    );
  }

  if (taskData?.deadline && new Date(taskData.deadline) < new Date()) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">Task has been ended</div>
      </div>
    );
  }

  const UserDat = session.user as { name: string; email: string; role: string; image: string; factId: string; domain: string }

  const taskStarter = async () => {
    try {
      const result = await TaskStart(UserDat.factId, TaskId);
      window.location.reload();
    } catch (error) {
      console.error('Error starting task:', error);
    }
  }

  const gettingFile = async () => {
    const formData = new FormData();
    if (taskData.fileKey !== null) {
      formData.append('filekey', taskData.fileKey);
    }

    try {
      const response = await fetch('/api/getFile', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const fileBlob = await response.blob();
        const fileUrl = URL.createObjectURL(fileBlob);
        window.open(fileUrl);
      } else {
        console.error('Error getting file:', response.status);
      }
    } catch (error) {
      console.error('Error getting file:', error);
    }

  }

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
    <div className="flex h-screen p-0 mx-0  overflow-y-auto">
      <div style={{ backgroundColor: "rgba(31,41,55,0.5)" }} className="w-1/2 h-full flex flex-col justify-center items-center p-2 overflow-y-auto">
        {timeLeft && (
          <div className="bg-gradient-to-tr from-blue-700 via-black to-red-700 rounded-md shadow-lg p-2 text-white font-mono text-lg mb-5">
            {timeLeft !== null ? (isRunning ? formatTime(timeLeft) : 'Timer Stopped') : 'Loading...'}
          </div>)}
        <div className="w-full max-w-md max-h-full bg-gray-900 rounded-lg shadow-lg p-2 border border-gray-700 mb-4 overflow-y-auto
        ">
          <div className="flex flex-col space-y-4">
            <p className="text-green-500 font-semibold text-4xl text-center mb-4 bg-transparent border-none break-words">{taskData.task}</p>
            <p className="text-green-500 font-semibold text-lg break-words">Description: <span className="font-normal break-words">{taskData.description}</span></p>
            <p className="text-green-500 font-semibold text-lg break-words">Points: <span className="font-normal">{taskData.points}</span></p>
            <div className='flex space-x-6 mr-0'>
              <p className="text-green-500 font-semibold text-lg break-words">Start Date: <span className="font-normal">{taskData.startDate}</span></p>
              <p className="text-green-500 font-semibold text-lg break-words">End Date: <span className="font-normal">{taskData.deadline}</span></p>
            </div>
            <p className="text-green-500 font-semibold text-lg breal-words">Duration: <span className="font-normal">{taskData.duration} Day(s)</span></p>

            {(timeLeft && taskData.fileKey) && (
              <button
                className="bg-gradient-to-tr from-blue-700 via-black to-red-700 text-white font-semibold py-2 px-2 rounded hover:bg-blue-600"
                onClick={gettingFile}
              >
                Download File
              </button>
            )}
            {!timeLeft && (<button onClick={taskStarter} className='bg-gradient-to-tr from-blue-700 via-black to-red-700 text-white font-semibold py-2 px-4 rounded'>
              Start Task
            </button>)}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "rgba(55,65,81,0.5)" }} className="w-1/2 h-full flex justify-center items-center">
        {timeLeft && <FileUpload taskid={TaskId} factid={factId ?? ''} />}
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
