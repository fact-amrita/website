// TicketTable.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { getTicketsByType, deleteTicket, clearTicket } from '@/lib/Tickets';

interface Ticket {
  TicketId: string;
  TicketType: string;
  TicketContent: string;
  FactID: string;
  DateTime: bigint;
  cleared: boolean;
}

const TicketTable: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    async function fetchTickets() {
      try {
        const fetchedTickets = await getTicketsByType(selectedType);
        if (!fetchedTickets) {
          setTickets([])
        }

        fetchedTickets.sort((a, b) => Number(b.DateTime) - Number(a.DateTime));
        
        setTickets(fetchedTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    }
    fetchTickets();
  }, [selectedType]);

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const closeModal = () => {
    setSelectedTicket(null);
  };
  var cleared: string;
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Ticket List</h2>
      <div className="flex justify-end mb-4">
        <select
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All</option>
          <option value="Feedback">Feedback</option>
          <option value="Complaint">Complaint</option>
        </select>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Cleared ?</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FactID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback Type</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tickets.map(ticket => (
            <tr key={ticket.TicketId} onClick={() => handleTicketClick(ticket)} className="cursor-pointer hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{(ticket.cleared).toString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{ticket.FactID}</td>
              <td className="px-6 py-4 whitespace-nowrap">{ticket.TicketType}</td>
              <td className="px-6 py-4 whitespace-wrap break-all">{ticket.TicketContent}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal or Card */}
      {selectedTicket && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg" style={{ zIndex: 1000 }}>
            <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>
            <p><strong>Ticket ID:</strong> {selectedTicket.TicketId}</p>
            <p><strong>Feedback Type:</strong> {selectedTicket.TicketType}</p>
            <p><strong>Message:</strong> {selectedTicket.TicketContent}</p>
            <p><strong>Posted By:</strong> {selectedTicket.FactID}</p>
            <p><strong>Posted at:</strong> { new Date(Number(selectedTicket.DateTime)).toLocaleString()}</p>
            <button className="mt-4 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" onClick={closeModal}>
              Close
            </button>
            <button className="mt-4 ml-2 py-2 px-4 bg-green-200 text-gray-800 rounded-md hover:bg-green-300" onClick={async ()=>{await clearTicket(selectedTicket.TicketId);closeModal();window.location.reload();}}>
              Clear Ticket
            </button>
            <button className="mt-4 ml-2 py-2 px-4 bg-red-500 text-gray-800 rounded-md hover:bg-red-600" onClick={async ()=>{await deleteTicket(selectedTicket.TicketId);closeModal();window.location.reload();}}>
              Delete Ticket
            </button>
          </div>
          <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
        </div>
      )}
    </div>
  );
};

export default TicketTable;
