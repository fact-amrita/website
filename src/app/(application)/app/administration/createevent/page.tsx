"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    router.push('/app/administration')};

  return (
    <ErrorBoundary>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 via-black to-red-500">
        <div className="bg-transparent p-8 rounded-lg shadow-2xl w-full max-w-lg">
          <h1 className="text-2xl text-center text-white mb-4">Create Event</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="visibleFromDate" className="text-white mb-1">Visible from Date:</label>
              <DatePicker
                id="visibleFromDate"
                selected={visibleFromDate}
                onChange={(date: Date | null) => setVisibleFromDate(date)}
                dateFormat="yyyy/MM/dd"
                className="w-full p-2 bg-gray-200 text-white border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="visibleToDate" className="text-white mb-1">Visible to Date:</label>
              <DatePicker
                id="visibleToDate"
                selected={visibleToDate}
                onChange={(date: Date | null) => setVisibleToDate(date)}
                dateFormat="yyyy/MM/dd"
                className="w-full p-2 bg-gray-200 text-white border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="text-white mb-1">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 h-40 bg-gray-200 text-white border border-gray-300 rounded resize-none"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="visibleFromDate" className="text-white mb-1">Link:</label>
              <input
                id="link"
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full p-2 bg-gray-200 text-white border border-gray-300 rounded" />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CreateEventForm;
