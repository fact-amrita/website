import React from 'react';
import TableComponent from '@/components/TableComponent';

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
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabbedComponent: React.FC<Component> = ({ LifetimeList, YearList, SemList, activeTab, setActiveTab }) => {
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

  return (
    <div className="p-4 w-full overflow-hidden">
      <div className="flex justify-between mb-1 w-full">
        <button
          onClick={() => setActiveTab('lifetime')}
          className={`px-4 py-2 border rounded-lg ${activeTab === 'lifetime' ? 'bg-zinc-800 text-white' : 'bg-gray-700 text-white'}`}
        >
          Lifetime
        </button>
        <button
          onClick={() => setActiveTab('semester')}
          className={`px-4 py-2 border rounded-lg ${activeTab === 'semester' ? 'bg-zinc-800 text-white' : 'bg-gray-700 text-white'}`}
        >
          Semester
        </button>
        <button
          onClick={() => setActiveTab('academicYear')}
          className={`px-4 py-2 border rounded-lg ${activeTab === 'academicYear' ? 'bg-zinc-800 text-white' : 'bg-gray-700 text-white'}`}
        >
          Academic Year
        </button>
      </div>
      <div className="flex justify-center mb-4 mt-5 mr-10">
        <h1 className='text-white text-2xl text-center bg-green-500 rounded-lg p-2'>HISTORY</h1>
      </div>
      <div className="flex justify-center">
        {activeTab === 'lifetime' && <TableComponent data={lifetimeData} />}
        {activeTab === 'semester' && <TableComponent data={semesterData} />}
        {activeTab === 'academicYear' && <TableComponent data={academicYearData} />}
      </div>
    </div>
  );
};

export default TabbedComponent;
