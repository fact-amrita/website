"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@/components/ui/Button';
import ErrorBoundary from '@/components/errorboundary';

const CreateEventForm: React.FC = () => {
  const [visibleFromDate, setVisibleFromDate] = useState<Date | null>(null);
  const [visibleToDate, setVisibleToDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: '/anotherpage',
      query: {
        visibleFromDate: visibleFromDate?.toISOString(),
        visibleToDate: visibleToDate?.toISOString(),
        description,
        link,
      },
    });
  };

  return (
    <ErrorBoundary>
    <div className='flex flex-col items-center bg-black min-h-screen'>
      <h1 className='text-center text-white bg-blue-600 mb-4 p-4'>Create Event</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <label className='text-white mb-2'>
          Visible from Date:
          <DatePicker
            selected={visibleFromDate}
            onChange={(date: Date | null) => setVisibleFromDate(date)}
            dateFormat='yyyy/MM/dd'
            className='w-1/3 p-2 mb-4'
          />
        </label>
        <label className='text-white mb-2'>
          Visible to Date:
          <DatePicker
            selected={visibleToDate}
            onChange={(date: Date | null) => setVisibleToDate(date)}
            dateFormat='yyyy/MM/dd'
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
        <label className='text-white mb-2'>
          Link:
          <input
            type='text'
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className='w-1/3 p-2 mb-4'
          />
        </label>
        <Button type='submit'>Submit</Button>
      </form>
    </div>
    </ErrorBoundary>
  );
};

export default CreateEventForm;
