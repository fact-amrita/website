import React from 'react';

interface totalpoints {
    LifeTimepts: number,
    SemesterPts: number,
    AcademicYearPts: number
}

function App({LifeTimepts, SemesterPts, AcademicYearPts}: totalpoints) {
  return (
    <div className="flex flex-col justify-between h-screen p-4">
      <div className="bg-blue-500 p-4 text-white rounded-md w-40 h-32 mt-7">
        {LifeTimepts}
        Points recieved in lifetime
      </div>
      <div className="bg-green-500 p-4 text-white rounded-md w-40 h-32">
        {SemesterPts}
        Points recieved in Semester
      </div>
      <div className="bg-red-500 p-4 text-white rounded-md w-40 h-32 mb-7">
        {AcademicYearPts}
        Points recieved in Academic Year
      </div>
    </div>
  );
}

export default App;
