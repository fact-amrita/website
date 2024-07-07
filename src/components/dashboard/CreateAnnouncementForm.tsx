"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/ui/Button';

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
    });
  };

  return (
    <div className='flex flex-col items-center bg-black min-h-screen'>
      <h1 className='text-center text-white bg-blue-600 mb-4 p-4'>Create Announcement</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <label className='text-white mb-2'>
          Visible from Date:
          <input
            type='text'
            value={visibleFromDate}
            onChange={(e) => setVisibleFromDate(e.target.value)}
            className='w-1/3 p-2 mb-4'
          />
        </label>
        <label className='text-white mb-2'>
          Visible to Date:
          <input
            type='text'
            value={visibleToDate}
            onChange={(e) => setVisibleToDate(e.target.value)}
            className='w-1/3 p-2 mb-4'
          />
        </label>
        <label className='text-white mb-2'>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-1/3 p-2 mb-4'
          />
        </label>
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  );
};

export default CreateAnnouncementForm;
