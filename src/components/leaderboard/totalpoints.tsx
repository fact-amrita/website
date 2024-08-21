import React from 'react';

interface TotalPointsProps {
    LifeTimepts: number;
    SemesterPts: number;
    AcademicYearPts: number;
}

function App({ LifeTimepts, SemesterPts, AcademicYearPts }: TotalPointsProps) {
  return (
    <div className="bg-transparent flex flex-col md:flex-row justify-between items-center p-4 space-y-4 md:space-y-0 md:space-x-4 overflow-clip">
      <div className="bg-zinc-800 p-4 text-white rounded-md shadow-none w-full md:w-1/4 h-[8rem] flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">{LifeTimepts}</div>
        <div className="mt-3 text-center">Points in Lifetime</div>
      </div>
      <div className="bg-zinc-800 p-4 text-white rounded-md shadow-none w-full md:w-1/4 h-[8rem] flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">{SemesterPts}</div>
        <div className="mt-3 text-center">Points in Semester</div>
      </div>
      <div className="bg-zinc-800 p-4 text-white rounded-md shadow-none w-full md:w-1/4 h-[8rem] flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">{AcademicYearPts}</div>
        <div className="mt-3 text-center">Points in Academic Year</div>
      </div>
    </div>
  );
}

export default App;
