"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import ErrorBoundary from "@/components/errorboundary";

const CreateAnnouncementForm: React.FC = () => {
  const [visibleFromDate, setVisibleFromDate] = useState('');
  const [visibleToDate, setVisibleToDate] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
        pathname: '/anotherpage',
        query: {
            visibleFromDate,
            visibleToDate,
            description,
        },
    } as unknown as string);
  };

  return (
    <ErrorBoundary> 
       <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-black min-h-screen">
  <h1 className="text-center text-white bg-blue-600 mb-4 p-4 rounded">
    Create Announcement
  </h1>
  <form onSubmit={handleSubmit} className="flex flex-col items-center p-6 bg-gray-800 rounded shadow-md border border-gray-700 w-1/3">
    <label className="text-white mb-2 w-full">
      Visible from Date:
      <input
        type="text"
        value={visibleFromDate}
        onChange={(e) => setVisibleFromDate(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
      />
    </label>
    <label className="text-white mb-2 w-full">
      Visible to Date:
      <input
        type="text"
        value={visibleToDate}
        onChange={(e) => setVisibleToDate(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
      />
    </label>
    <label className="text-white mb-2 w-full">
      Description:
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
      />
    </label>
    <Button type="submit" >
      Submit
    </Button>
  </form>
</div>
    </ErrorBoundary>
  );
};

export default CreateAnnouncementForm;
