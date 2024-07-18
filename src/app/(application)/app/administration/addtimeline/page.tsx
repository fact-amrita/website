"use client";

import { useState, ChangeEvent, useEffect } from 'react';
import { getTimelines, addToTimeline, deleteTimeline } from "@/lib/AdminOps";

interface Event {
  id: string;
  Title: string;
  Date: string;
}

const Timeline = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const addEvent = async () => {
    if (title.trim() && date.trim()) {
      const timelines = await addToTimeline(title.trim(), date.trim());
      setEvents(timelines);
      setTitle('');
      setDate('');
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const timelines = await getTimelines();
      setEvents(timelines);
    };

    fetchEvents();
  }, []);

  const deleteEvent = async (id: string) => {
    const timelines = await deleteTimeline(id);
    setEvents(timelines);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-200 via-purple-300 to-sky-300 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Timeline</h1>
        <div className="flex flex-col mb-4 space-y-2">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="border rounded p-2 flex-grow"
            placeholder="Add new event"
          />
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="border rounded p-2 flex-grow"
          />
          <button
            onClick={addEvent}
            className="bg-blue-500 text-white p-2 rounded mt-2"
          >
            Add
          </button>
        </div>
        <ul>
          {events.map(event => (
            <li key={event.id} className="mb-2 flex justify-between items-center">
              <span>{event.Date} - {event.Title}</span>
              <button
                onClick={() => deleteEvent(event.id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
