"use client";

import React, { useState } from 'react';

interface TableData {
  number: number;
  description: string;
  date: string;
  time?: string;
  points: number;
}

interface Task {
  id: string;
  taskId: string;
  FactID: string;
  completeTime: string;
  Filekey: string | null;
  awarded: number | null;
  status: string;
  pointsId: string;
};

interface Component {
  LifetimeList: any;
  YearList: any;
  SemList: any
}

const TabbedComponent: React.FC<Component> = ({ LifetimeList, YearList, SemList }) => {
  const [activeTab, setActiveTab] = useState<string>('lifetime');

  const lifetimeData: TableData[] = [];
  LifetimeList.forEach(async (task: any, index: any) => {
    lifetimeData.push({
      number: index + 1,
      description: task.task,
      date: task.completeTime,
      points: task.awarded || 0
    });
  });

  const semesterData: TableData[] = [];
  SemList.forEach(async (task: any, index: any) => {
    semesterData.push({
      number: index + 1,
      description: task.task,
      date: task.completeTime,
      points: task.awarded || 0
    });
  });

  const academicYearData: TableData[] = [];
  YearList.forEach(async (task: any, index: any) => {
    academicYearData.push({
      number: index + 1,
      description: task.task,
      date: task.completeTime,
      points: task.awarded || 0
    });
  });

  const MAX_ROWS = 10;

  const renderTableRows = (data: TableData[]) => {
    const rows = data.map((row, index) => (
      <tr key={index}>
        <td className="border border-black px-4 py-2 text-black">{row.number}</td>
        <td className="border border-black px-4 py-2 text-black">{row.description}</td>
        <td className="border border-black px-4 py-2 text-black">{new Date('2024-07-10T12:54:58.923Z').toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
        <td className="border border-black px-4 py-2 text-black">{row.points}</td>
      </tr>
    ));

    // Add empty rows if necessary to reach MAX_ROWS
    for (let i = rows.length; i < MAX_ROWS; i++) {
      rows.push(
        <tr key={i}>
          <td className="border border-black px-4 py-2 text-black">ㅤ</td>
          <td className="border border-black px-4 py-2 text-black">ㅤ</td>
          <td className="border border-black px-4 py-2 text-black">ㅤ</td>
          <td className="border border-black px-4 py-2 text-black">ㅤ</td>
        </tr>
      );
    }

    return rows;
  };

  return (
    <div className="p-4 w-full overflow-hidden">
      <div className="flex justify-between mb-1 w-full">
        <button
          onClick={() => setActiveTab('lifetime')}
          className={`px-4 py-2 border rounded-lg ${activeTab === 'lifetime' ? 'bg-gradient-to-tr from-blue-700 via-black to-red-700 text-white' : 'bg-gray-700'}`}
        >
          Lifetime
        </button>
        <button
          onClick={() => setActiveTab('semester')}
          className={`px-4 py-2 border rounded-lg ${activeTab === 'semester' ? 'bg-gradient-to-tr from-blue-700 via-black to-red-700 text-white' : 'bg-gray-700'}`}
        >
          Semester
        </button>
        <button
          onClick={() => setActiveTab('academicYear')}
          className={`px-4 py-2 border rounded-lg ${activeTab === 'academicYear' ? 'bg-gradient-to-tr from-blue-700 via-black to-red-700 text-white' : 'bg-gray-700'}`}
        >
          Academic Year
        </button>
      </div>
      <div className="flex justify-center">
        <div className="overflow-x-auto w-full">
          <table className="w-full bg-slate-200 border-collapse border border-black">
            <thead>
              <tr>
                <th className="border border-black px-4 py-2 text-black">Number</th>
                <th className="border border-black px-4 py-2 text-black">Description</th>
                <th className="border border-black px-4 py-2 text-black">Date</th>
                <th className="border border-black px-4 py-2 text-black">Points</th>
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
    </div>
  );
};

export default TabbedComponent;
