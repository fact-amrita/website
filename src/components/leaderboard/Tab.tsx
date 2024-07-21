"use client";

import React, { useState } from 'react';

interface TableData {
  number: number;
  description: string;
  date: string;
  time?: string;
  points: number;
}

interface Component {
  LifetimeList: any;
  YearList: any;
  SemList: any;
}

const TabbedComponent: React.FC<Component> = ({ LifetimeList, YearList, SemList }) => {
  const [activeTab, setActiveTab] = useState<string>('lifetime');

  const lifetimeData: TableData[] = LifetimeList.map((task: any, index: number) => ({
    number: index + 1,
    description: task.task,
    date: task.completeTime,
    points: task.awarded || 0
  }));

  const semesterData: TableData[] = SemList.map((task: any, index: number) => ({
    number: index + 1,
    description: task.task,
    date: task.completeTime,
    points: task.awarded || 0
  }));

  const academicYearData: TableData[] = YearList.map((task: any, index: number) => ({
    number: index + 1,
    description: task.task,
    date: task.completeTime,
    points: task.awarded || 0
  }));

  const renderTableRows = (data: TableData[]) => {
    const rows = data.map((row, index) => (
      <React.Fragment key={index}>
        <tr>
          <td className="px-4 py-2 text-black">{row.number}</td>
          <td className="px-4 py-2 text-black">{row.description}</td>
          <td className="px-4 py-2 text-black">{new Date(row.date).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
          <td className="px-4 py-2 text-black">{row.points}</td>
        </tr>
        <tr><td colSpan={4}><hr className="border-gray-300" /></td></tr>
      </React.Fragment>
    ));

    // Add empty rows if necessary to reach 5 rows
    for (let i = rows.length / 2; i < 5; i++) {
      rows.push(
        <React.Fragment key={`empty-${i}`}>
          <tr>
            <td className="px-4 py-2 text-black">ㅤ</td>
            <td className="px-4 py-2 text-black">ㅤ</td>
            <td className="px-4 py-2 text-black">ㅤ</td>
            <td className="px-4 py-2 text-black">ㅤ</td>
          </tr>
          <tr><td colSpan={4}><hr className="border-gray-300" /></td></tr>
        </React.Fragment>
      );
    }

    return rows;
  };

  return (
    <div className="p-4 w-full overflow-hidden">
      <div className="flex justify-between mb-1 w-full">
        <button
          onClick={() => setActiveTab('lifetime')}
          className={`px-4 py-2 border rounded-lg ${activeTab === 'lifetime' ? 'bg-gradient-to-tr from-blue-700 via-black to-red-700 text-white' : 'bg-gray-700 text-white'}`}
        >
          Lifetime
        </button>
        <button
          onClick={() => setActiveTab('semester')}
          className={`px-4 py-2 border rounded-lg ${activeTab === 'semester' ? 'bg-gradient-to-tr from-blue-700 via-black to-red-700 text-white' : 'bg-gray-700 text-white'}`}
        >
          Semester
        </button>
        <button
          onClick={() => setActiveTab('academicYear')}
          className={`px-4 py-2 border rounded-lg ${activeTab === 'academicYear' ? 'bg-gradient-to-tr from-blue-700 via-black to-red-700 text-white' : 'bg-gray-700 text-white'}`}
        >
          Academic Year
        </button>
      </div>
      <div className="flex justify-center mb-4 mt-5 mr-10">
        <h1 className='text-white text-2xl text-center bg-green-500 rounded-lg p-2'>HISTORY</h1>
      </div>
      <div className="flex justify-center">
        <div className="overflow-y-auto w-full h-55 sm:h-45 md:h-50 lg:h-69"> {/* Set height to enable vertical scroll */}
          <table className="w-full bg-slate-200 border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-black">Number</th>
                <th className="px-4 py-2 text-black">Description</th>
                <th className="px-4 py-2 text-black">Date</th>
                <th className="px-4 py-2 text-black">Points</th>
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
