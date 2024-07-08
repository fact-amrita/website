"use client";

import { useState, ChangeEvent } from 'react';

interface Event {
  id: number;
  text: string;
}

const Timeline = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [input, setInput] = useState<string>('');

  const addEvent = () => {
    if (input.trim()) {
      setEvents([...events, { id: Date.now(), text: input.trim() }]);
      setInput('');
    }
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
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
            <li key={event.id} className="mb-2 flex justify-between items-center">
              <span>{event.text}</span>
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
