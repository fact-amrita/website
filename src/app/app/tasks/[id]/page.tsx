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

const TaskPage: React.FC<TaskPageProps> = ({ TaskId }) => {
  const { data: session, status } = useSession();
  const [taskData, setTaskData] = useState<any>(null);


  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const data = await TaskGetById(TaskId);
        if (!data) { setTaskData("not found"); return; }
        setTaskData(data);
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };
    fetchTaskData();
  }, [TaskId]);

  if (!taskData) {
    return <p>Loading...</p>;
  }

  if (taskData == "not found") {
    return <p>Task not found</p>
  }

  return (
    <div className="flex h-screen p-0 m-0">
      <div className="w-1/2 h-full bg-gray-700 flex justify-center items-center">
        <div className="w-3/4 h-3/4 bg-gray-500 rounded-lg flex justify-center items-center">
          <div className="flex flex-col">
            <p>Task ID: {taskData.TaskId}</p>
            <p>Task: {taskData.task}</p>
            <p>Description: {taskData.description}</p>
            <p>Points: {taskData.points}</p>
            <p>Domain: {taskData.domain}</p>
            <p>Start Date: {taskData.startDate}</p>
            <p>Deadline: {taskData.deadline}</p>
            <p>Duration: {taskData.duration} Day(s)</p>
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
}

export default TaskPageWrapper;