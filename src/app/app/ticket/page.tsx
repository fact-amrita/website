'use client';

import React, { useState } from 'react';
import { SessionProvider,useSession } from 'next-auth/react';

interface TicketFormProps {
  initialFeedbackType?: string;
  initialMessage?: string;
  onSubmit: (formData: { feedbackType: string; message: string }) => void;
}

const TicketForm: React.FC<TicketFormProps> = ({
  initialFeedbackType = 'Feedback',
  initialMessage = '',
  onSubmit,
}) => {
  const [feedbackType, setFeedbackType] = useState(initialFeedbackType);
  const [message, setMessage] = useState(initialMessage);

  const handleFeedbackTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFeedbackType(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ feedbackType, message });
    // Optionally reset form state
    setFeedbackType(initialFeedbackType);
    setMessage(initialMessage);
  };

  return (
    <div className="ticket-form flex justify-center items-center h-screen overflow-hidden bg-white">
      <div className="ticket-form-container w-full h-2/4 max-w-md p-4 bg-gray-100 rounded shadow-lg focus:outline-none focus:ring focus:ring-blue-700">
        <h2 className="text-3xl font-bold mb-7 text-center text-blue-500">Submit a Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="feedbackType" className="block mb-1 text-blue-700">
              Type:
            </label>
            <select
              id="feedbackType"
              value={feedbackType}
              onChange={handleFeedbackTypeChange}
              className="w-full px-3 py-2 border rounded shadow-md focus:ring focus:ring-blue-600 text-black"
            >
              <option className="text-black" value="Feedback">Feedback</option>
              <option className="text-black" value="Complaint">Complaint</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block mb-4 text-blue-700">
              Message:
            </label>
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              placeholder="Type your message"
              rows={7}
              className="message-textarea resize-none w-full px-7 py-11 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500 text-black user-select:none resize:vertical"
            />
          </div>
          <button type="submit" className="w-full py-3 px-4 rounded bg-[#7747FF] hover:bg-white hover:text-[#7747FF] focus:text-[#7747FF] focus:bg-gray-200 text-gray-50 font-bold leading-loose transition duration-200">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default function Ticket() {
  return (
    <SessionProvider>
      <TicketForm onSubmit={(formData) => {
        console.log(formData);
      }} />
    </SessionProvider>
  );
}

