"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@/components/ui/Button';
import ErrorBoundary from "@/components/errorboundary";
import { createAnnouncement } from '@/lib/AdminOps';

const CreateAnnouncementForm: React.FC = () => {
  const [visibleFromDate, setVisibleFromDate] = useState<Date | null>(null);
  const [visibleToDate, setVisibleToDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visibleFromDate || !visibleToDate || !description) {
      alert('Please fill in all fields');
      return;
    }
    const announcement = await createAnnouncement(visibleFromDate.toISOString(), visibleToDate.toISOString(), description);

    if (!announcement) {
      alert('Failed to create announcement');
    } else {
      router.push('/app/administration');
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 via-black to-red-500">
        <div className="bg-transparent p-8 rounded-lg shadow-2xl w-full max-w-lg">
          <h1 className="text-2xl text-center text-white mb-4">Create Announcement</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col" style={{ color: "black" }}>
              <label htmlFor="visibleFromDate" className="text-white mb-1">Visible from Date:</label>
              <DatePicker
                id="visibleFromDate"
                selected={visibleFromDate}
                onChange={(date: Date | null) => setVisibleFromDate(date)}
                dateFormat="yyyy/MM/dd"
                className="w-full p-2 bg-gray-200 border border-gray-300 rounded text-black"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="visibleToDate" className="text-white mb-1">Visible to Date:</label>
              <DatePicker
                id="visibleToDate"
                selected={visibleToDate}
                onChange={(date: Date | null) => setVisibleToDate(date)}
                dateFormat="yyyy/MM/dd"
                className="w-full p-2 bg-gray-200 border border-gray-300 rounded text-black"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="text-white mb-1">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="text-black w-full p-2 h-40 bg-gray-200 border border-gray-300 rounded resize-none"
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CreateAnnouncementForm;
