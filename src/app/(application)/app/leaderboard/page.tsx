"use client";

import React from "react";
import Tab from "@/components/leaderboard/Tab";
import RanksTable from "@/components/leaderboard/RanksTable";
import TotalPoints from "@/components/leaderboard/totalpoints";

const Leaderboard = () => {
    return (
      <div className="h-screen p-4 bg-gray-500">
        <div className="grid grid-cols-6 gap-2 h-full w-full">
          <div className="col-span-3 flex items-center justify-center h-full rounded-lg">
            <span className="text-white text-md">
                <Tab />
            </span>
          </div>
          <div className="col-span-1 flex items-center justify-center h-full rounded-lg">
            <span className="text-white text-md">
                <TotalPoints LifeTimepts={0} SemesterPts={0} AcademicYearPts={0} />
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-center h-full rounded-lg">
            <span className="text-white text-md">
                <RanksTable />
            </span>
          </div>
        </div>
      </div>
    )
};

export default Leaderboard;