"use client";


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
          setTickets([]);
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

  return (
    <div className="p-4 sm:p-6 lg:p-8" style={{ marginLeft: "20px" }}>
      <h2 className="text-xl sm:text-2xl lg:text-3xl ml-4 sm:ml-8 md:ml-6 font-bold mb-4 text-zinc-50">Ticket List</h2>
      <div className="flex justify-end mb-4">
        <select
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md"
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All</option>
          <option value="Feedback">Feedback</option>
          <option value="Complaint">Complaint</option>
        </select>
      </div>
      <div className="overflow-x-auto flex justify-center">
        <table className="max-w-5xl w-full text-xs border-collapse border border-gray-200" style={{ fontSize: "1em", lineHeight: "2rem" }}>
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider border-t border-gray-200">Ticket Cleared?</th>
              <th scope="col" className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider border-t border-gray-200">FactID</th>
              <th scope="col" className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider border-t border-gray-200">Feedback Type</th>
              <th scope="col" className="px-2 py-1 text-left font-medium text-gray-500 uppercase tracking-wider border-t border-gray-200">Message</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {tickets.map(ticket => (
              <tr key={ticket.TicketId} onClick={() => handleTicketClick(ticket)} className="cursor-pointer hover:bg-gray-50 border-t border-gray-200">
                <td className="px-2 py-1 whitespace-nowrap border-t border-gray-200">{ticket.cleared.toString()}</td>
                <td className="px-2 py-1 whitespace-nowrap border-t border-gray-200">{ticket.FactID}</td>
                <td className="px-2 py-1 whitespace-nowrap border-t border-gray-200">{ticket.TicketType}</td>
                <td className="px-2 py-1 whitespace-wrap break-all border-t border-gray-200">{ticket.TicketContent.length > 15 ? `${ticket.TicketContent.substring(0, 15)}...` : ticket.TicketContent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTicket && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-lg shadow-lg relative" style={{ zIndex: "99" }}>
            <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>
            <p><strong>Ticket ID:</strong> {selectedTicket.TicketId}</p>
            <p><strong>Feedback Type:</strong> {selectedTicket.TicketType}</p>
            {selectedTicket.TicketType === "Complaint" && (
              <p><strong>Ticket Status:</strong> {selectedTicket.cleared ? "Cleared" : "Not Cleared"}</p>
            )}
            <p style={{ overflowWrap: "break-word" }}><strong>Message:</strong> {selectedTicket.TicketContent}</p>
            <p><strong>Posted By:</strong> {selectedTicket.FactID}</p>
            <p><strong>Posted at:</strong> {new Date(Number(selectedTicket.DateTime)).toLocaleString()}</p>
            <button className="mt-4 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" onClick={closeModal}>
              Close
            </button>
            {!selectedTicket.cleared && (
              <button className="mt-4 ml-2 py-2 px-4 bg-green-200 text-gray-800 rounded-md hover:bg-green-300" onClick={async () => { await clearTicket(selectedTicket.TicketId); closeModal(); window.location.reload(); }}>
                Clear Ticket
              </button>
            )}
            <button className="mt-4 ml-2 py-2 px-4 bg-red-500 text-gray-800 rounded-md hover:bg-red-600" onClick={async () => { await deleteTicket(selectedTicket.TicketId); closeModal(); window.location.reload(); }}>
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
