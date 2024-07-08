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
  const [input, setInput] = useState<string>('');

  const addEvent = async () => {
    if (input.trim()) {
      const timelines = await addToTimeline(input.trim(), new Date().toISOString());
      setEvents(timelines);
      setInput('');
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-200 via-purple-300 to-sky-300 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Timeline</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="border rounded p-2 flex-grow"
            placeholder="Add new event"
          />
          <button
            onClick={addEvent}
            className="ml-2 bg-blue-500 text-white p-2 rounded"
          >
            Add
          </button>
        </div>
        <ul>
          {events.map(event => (
            <li className="mb-2 flex justify-between items-center">
              <span>{event.Title}</span>
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
