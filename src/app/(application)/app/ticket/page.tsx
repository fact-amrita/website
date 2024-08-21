'use client';

import React, { useState } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { createTicket } from '@/lib/Tickets';

interface TicketFormProps {
  initialFeedbackType?: string;
  initialMessage?: string;
}

const TicketForm: React.FC<TicketFormProps> = ({
  initialFeedbackType = 'Feedback',
  initialMessage = '',
}) => {
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const [feedbackType, setFeedbackType] = useState(initialFeedbackType);
  const [message, setMessage] = useState(initialMessage);

  if (status === 'loading') {
    return <p>Loading...</p>; // Optional loading state
  }

  if (!session || !session.user) {
    return (
      <div className="flex justify-center items-center h-screen bg-darkcharcoal">
        <div className="text-red-500 text-2xl">You need to be logged in to access your profile.</div>
      </div>
    );
  }

  const userdat = session.user as { name: string; email: string; role: string; image: string; factId: string };

  const handleFeedbackTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFeedbackType(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTicket({ FactID: userdat.factId, TicketType: feedbackType, TicketContent: message });
    toast({
      variant: 'success',
      title: 'Success!',
      description: 'Ticket has been created.',
    });
    setFeedbackType(initialFeedbackType);
    setMessage(initialMessage);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-darkcharcoal p-4">
      <div className="w-full max-w-md p-6 bg-transparent rounded-lg shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-aqua">Submit a Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="feedbackType" className="block mb-1 text-blue-300 text-xl">
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
            <label htmlFor="message" className="block mb-1 text-blue-300 text-xl">
              Message:
            </label>
            <textarea
              required
              id="message"
              value={message}
              onChange={handleMessageChange}
              placeholder="Type your message"
              className="resize-none w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded bg-neongreen text-black hover:bg-red-500  focus:bg-gray-200 focus:text-[#7747FF] transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default TicketForm;
