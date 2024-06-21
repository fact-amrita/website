import React, { useState } from 'react';
import Box from './Box';

interface TabNumbers {
  lifetime: number[];
  semester: number[];
  academicYear: number[];
}

const TabbedComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('lifetime');

  const tabNumbers: TabNumbers = {
    lifetime: [1, 2, 3, 4, 5, 6, 7, 8],
    semester: [9, 8, 7, 6, 5, 4, 3, 2],
    academicYear: [1, 3, 5, 7, 9, 2, 4, 6],
  };

  const boxTexts: string[] = [
    'Assignment Points', 'Task Points', 'Forum Points', 'Penalty Points', 'Competition Points', 
    'OverDue Points', 'Bonus Points', 'Hint Points'
  ];

  const renderBoxes = (numbers: number[]) => {
    return numbers.map((number, index) => (
      <Box key={index} number={number} text={boxTexts[index]} />
    ));
  };

  return (
    <div className="p-4">
      <div className="flex justify-around mb-4">
        <button
          onClick={() => setActiveTab('lifetime')}
          className={`px-4 py-2 border ${activeTab === 'lifetime' ? 'bg-gray-200' : 'bg-gray-100'}`}
        >
          Lifetime
        </button>
        <button
          onClick={() => setActiveTab('semester')}
          className={`px-4 py-2 border ${activeTab === 'semester' ? 'bg-gray-200' : 'bg-gray-100'}`}
        >
          Semester
        </button>
        <button
          onClick={() => setActiveTab('academicYear')}
          className={`px-4 py-2 border ${activeTab === 'academicYear' ? 'bg-gray-200' : 'bg-gray-100'}`}
        >
          Academic Year
        </button>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-4">
          {activeTab === 'lifetime' && renderBoxes(tabNumbers.lifetime)}
          {activeTab === 'semester' && renderBoxes(tabNumbers.semester)}
          {activeTab === 'academicYear' && renderBoxes(tabNumbers.academicYear)}
        </div>
      </div>
    </div>
  );
};

export default TabbedComponent;
