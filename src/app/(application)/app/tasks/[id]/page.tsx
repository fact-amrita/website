'use client';

import React, { useEffect, useState } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { TaskStart, TaskGetById } from "@/lib/TaskOperations";
import FileUpload from '@/components/tasks/fileupload';
import { isTaskPending, isTaskCompleted } from '@/lib/TaskOperations';

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
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">This Task has already been submitted</div>
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
    <div className="flex h-screen p-0 mx-0 overflow-clip">
      <div style={{ backgroundColor: "rgba(31,41,55,0.6)" }} className="w-1/2 h-full flex flex-col justify-center items-center p-2">
        {timeLeft && (
          <div className="bg-gradient-to-tr from-blue-700 via-black to-red-700 rounded-md shadow-lg p-2 text-white font-mono text-lg mb-5">
            {timeLeft !== null ? (isRunning ? formatTime(timeLeft) : 'Timer Stopped') : 'Loading...'}
          </div>)}
        <div className="w-3/4 h-auto bg-gray-900 rounded-lg shadow-lg p-2 border border-gray-700 mb-4">
          <div className="flex flex-col space-y-4">
            <p className="text-green-500 font-semibold text-4xl text-center mb-4">{taskData.task}</p>
            <p className="text-green-500 font-semibold text-lg">Description: <span className="font-normal">{taskData.description}</span></p>
            <p className="text-green-500 font-semibold text-lg">Points: <span className="font-normal">{taskData.points}</span></p>
            <div className='flex space-x-6 mr-0'>
              <p className="text-green-500 font-semibold text-lg">Start Date: <span className="font-normal">{taskData.startDate}</span></p>
              <p className="text-green-500 font-semibold text-lg">End Date: <span className="font-normal">{taskData.deadline}</span></p>
            </div>
            <p className="text-green-500 font-semibold text-lg">Duration: <span className="font-normal">{taskData.duration} Day(s)</span></p>
            <button
              className={`bg-gradient-to-tr from-blue-700 via-black to-red-700 text-white font-semibold py-2 px-4 rounded ${isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
              onClick={isRunning ? stopTimer : startTimer}
              disabled={isRunning}
            >
              {isRunning ? 'Running...' : 'Take Action'}
            </button>

            {(timeLeft && taskData.fileKey) && (
              <button
                className="bg-gradient-to-tr from-blue-700 via-black to-red-700 text-white font-semibold py-2 px-2 rounded hover:bg-blue-600"
                onClick={gettingFile}
              >
                Download File
              </button>
            )}
            {!timeLeft && (<button onClick={taskStarter} className='text-blue-700'>
              Start Task
            </button>)}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "rgba(55,65,81,0.6)" }} className="w-1/2 h-full flex justify-center items-center">
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
