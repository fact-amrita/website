import React, { useState } from 'react';

interface TableData {
  number: number;
  description: string;
  date: string;
  time: string;
  points: number;
}

const TabbedComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('lifetime');

  const lifetimeData: TableData[] = [
    { number: 1, description: 'Assignment Points', date: '2024-01-01', time: '10:00 AM', points: 100 },
    { number: 2, description: 'Task Points', date: '2024-02-01', time: '11:00 AM', points: 90 },
    // Add more data as needed
  ];

  const semesterData: TableData[] = [
    { number: 3, description: 'Forum Points', date: '2024-03-01', time: '12:00 PM', points: 80 },
    { number: 4, description: 'Penalty Points', date: '2024-04-01', time: '01:00 PM', points: 70 },
    // Add more data as needed
  ];

  const academicYearData: TableData[] = [
    { number: 5, description: 'Competition Points', date: '2024-05-01', time: '02:00 PM', points: 60 },
    { number: 6, description: 'Overdue Points', date: '2024-06-01', time: '03:00 PM', points: 50 },
    // Add more data as needed
  ];

  const renderTableRows = (data: TableData[]) => {
    return data.map((row, index) => (
      <tr key={index}>
        <td className="border px-4 py-2 text-black">{row.number}</td>
        <td className="border px-4 py-2 text-black">{row.description}</td>
        <td className="border px-4 py-2 text-black">{row.date}</td>
        <td className="border px-4 py-2 text-black">{row.time}</td>
        <td className="border px-4 py-2 text-black">{row.points}</td>
      </tr>
    ));
  };

  return (
    <div className="p-4">
      <div className="flex justify-around mb-4">
        <button
          onClick={() => setActiveTab('lifetime')}
          className={`px-4 py-2 border rounded-lg ${activeTab === 'lifetime' ? 'bg-gradient-to-tl from-blue-700 via-black to-red-700' : 'bg-gray-700'}`}
        >
          Lifetime
        </button>
        <button
          onClick={() => setActiveTab('semester')}
          className={`px-4 py-2 border rounded-lg ${activeTab === 'semester' ? 'bg-gradient-to-tl from-blue-700 via-black to-red-700' : 'bg-gray-700'}`}
        >
          Semester
        </button>
        <button
          onClick={() => setActiveTab('academicYear')}
          className={`px-4 py-2 border rounded-lg ${activeTab === 'academicYear' ? 'bg-gradient-to-tl from-blue-700 via-black to-red-700' : 'bg-gray-700'}`}
        >
          Academic Year
        </button>
      </div>
      <div className="flex justify-center">
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-black">Number</th>
              <th className="border px-4 py-2 text-black">Description</th>
              <th className="border px-4 py-2 text-black">Date</th>
              <th className="border px-4 py-2 text-black">Time</th>
              <th className="border px-4 py-2 text-black">Points</th>
            </tr>
          </thead>
          <tbody>
            {activeTab === 'lifetime' && renderTableRows(lifetimeData)}
            {activeTab === 'semester' && renderTableRows(semesterData)}
            {activeTab === 'academicYear' && renderTableRows(academicYearData)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabbedComponent;

