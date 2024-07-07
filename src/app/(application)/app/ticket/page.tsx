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
    return <p></p>; // Suspense content can be added here
  }

  if (!session || !session.user) {
    return <p>You need to be logged in to access your profile.</p>;
  }

  const userdat = session.user as { name: string; email: string; role: string; image: string; factId: string };

  const handleFeedbackTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFeedbackType(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ feedbackType, message });
    var ticketCreated = createTicket({ FactID: userdat.factId, TicketType: feedbackType, TicketContent: message });
    console.log(ticketCreated);
    setFeedbackType(initialFeedbackType);
    setMessage(initialMessage);
  };

  const showtoast = async (e: React.FormEvent<HTMLFormElement>) => {
    toast({
      variant: 'success',
      title: 'Success!',
      description: 'Ticket has been Created',
    });
  };

  return (
    <div className="ticket-form flex justify-center items-center h-screen overflow-hidden bg-gradient-to-tr from-blue-700 via-black to-red-700">
      <div className="ticket-form-container w-full h-2/4 max-w-md p-4 bg--gradient-to-tr from-gray-500 to-slate-500 rounded shadow-lg focus:outline-none focus:ring focus:ring-blue-700">
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
              required={true}
              id="message"
              value={message}
              onChange={handleMessageChange}
              placeholder="Type your message"
              className="message-textarea resize-none w-full px-7 py-11 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500 text-black user-select:none resize:vertical"
            />
          </div>
          <button onClick={showtoast} type="submit" className="w-full py-3 px-4 rounded bg-[#7747FF] 
            hover:bg-white hover:text-[#7747FF] 
            focus:text-[#7747FF] focus:bg-gray-200 text-gray-50 
            font-bold leading-loose transition duration-200 " >
            Submit
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default function Ticket() {
  return (
    <SessionProvider>
      <TicketForm />
    </SessionProvider>
  );
}

