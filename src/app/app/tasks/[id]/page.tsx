'use client';

import React, { useState } from 'react';
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

function TaskPage({ TaskId }: { TaskId: string }){
  const { data: session, status } = useSession();

  console.log(TaskId)

  // const taskData = await TaskGetById(TaskId);

  // console.log(taskData)

  return (
    <div className="flex h-screen p-0 m-0">
      <div className="w-1/2 h-full bg-gray-700 flex justify-center items-center">
        <div className="w-3/4 h-3/4 bg-gray-500 rounded-lg flex justify-center items-center">
          Box 1
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