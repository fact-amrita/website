// TicketTable.tsx

import React, { useEffect, useState } from 'react';
import { getTickets } from '@/lib/Tickets';

interface Ticket {
  TicketId: string;
  TicketType: string;
  Message: string;
}

const TicketTable: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const fetchedTickets = await getTickets();
        setTickets(fetchedTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    }
    fetchTickets();
  }, []);

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const closeModal = () => {
    setSelectedTicket(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Ticket List</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback Type</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tickets.map(ticket => (
            <tr key={ticket.TicketId} onClick={() => handleTicketClick(ticket)} className="cursor-pointer hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{ticket.TicketId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{ticket.TicketType}</td>
              <td className="px-6 py-4 whitespace-wrap break-all">{ticket.Message}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal or Card */}
      {selectedTicket && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>
            <p><strong>Ticket ID:</strong> {selectedTicket.TicketId}</p>
            <p><strong>Feedback Type:</strong> {selectedTicket.TicketType}</p>
            <p><strong>Message:</strong> {selectedTicket.Message}</p>
            <button className="mt-4 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" onClick={closeModal}>
              Close
            </button>
          </div>
          <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
        </div>
      )}
    </div>
  );
};

export default TicketTable;
