import React from 'react';

interface totalpoints {
    LifeTimepts: number,
    SemesterPts: number,
    AcademicYearPts: number
}

function App({LifeTimepts, SemesterPts, AcademicYearPts}: totalpoints) {
  return (
    <div className="flex flex-row justify-between h-screen p-4 space-x-4">
      <div className="bg-gradient-to-tl from-blue-700 via-black to-red-700 p-4 text-white    rounded-md w-32 h-[8rem]">
          {LifeTimepts}
          <div className='mt-3'>
            Points in lifetime
          </div>
      </div>
      <div className="bg-gradient-to-tl from-blue-700 via-black to-red-700 p-4 text-white rounded-md w-32 h-[8rem]">
          {SemesterPts}
          <div className='mt-3'>
            Points in Semester
          </div>
      </div>
      <div className="bg-gradient-to-tl from-blue-700 via-black to-red-700 p-4 text-white rounded-md w-32 h-[8rem]">
          {AcademicYearPts}
          <div className='mt-3'>
            Points in Academic Year
          </div>
      </div>
  </div>
  );
}

export default App;
