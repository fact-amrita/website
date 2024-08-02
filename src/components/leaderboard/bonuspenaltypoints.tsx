"use client"

import React, { useState, useEffect } from 'react';
import { getUsersPenaltyPoints, getUsersPenaltyPointsSemester, getUsersPenaltyPointsYear, getUsersBonusPoints, getUsersBonusPointsSemester, getUsersBonusPointsYear } from "@/lib/UserOperations"
import { getUserByFactID } from "@/lib/UserFetch"

interface bonuspenaltypointsProps {
  activeTab: string;
  factId: string;
}

function App({ activeTab, factId }: bonuspenaltypointsProps) {
  const [BonusPoints, setBonusPoints] = useState(0);
  const [PenaltyPoints, setPenaltyPoints] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let bonus;
      let penalty;

      const userdata = await getUserByFactID(factId);

      if (activeTab == 'semester') {
        bonus = (await getUsersBonusPointsSemester(factId, userdata?.semester || "0"));
        penalty = await getUsersPenaltyPointsSemester(factId, userdata?.semester || "0");
      } else if (activeTab == 'academicYear') {
        bonus = (await getUsersBonusPointsYear(factId));
        penalty = await getUsersPenaltyPointsYear(factId);
      } else {
        bonus = (await getUsersBonusPoints(factId)) || 0;
        penalty = await getUsersPenaltyPoints(factId);
      }
      setBonusPoints(bonus || 0);
      setPenaltyPoints(penalty || 0);
    }
    fetchData();
  }, [activeTab, factId])

  return (
    <div className="bg-transparent flex flex-col md:flex-row justify-between items-center p-4 space-y-4 md:space-y-0 md:space-x-4 overflow-clip">
      <div className="bg-gradient-to-tl from-blue-700 via-black to-red-700 p-4 text-white rounded-md shadow-none w-full md:w-1/4 h-[8rem] flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">{BonusPoints}</div>
        <div className="mt-3 text-center">Bonus Points</div>
      </div>
      <div className="bg-gradient-to-tl from-blue-700 via-black to-red-700 p-4 text-white rounded-md shadow-none w-full md:w-1/4 h-[8rem] flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">{PenaltyPoints * -1}</div>
        <div className="mt-3 text-center">Penalty Points</div>
      </div>
    </div>
  );
}

export default App;
