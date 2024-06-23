"use client";

import React from "react";
import Tab from "@/components/leaderboard/Tab";
import RanksTable from "@/components/leaderboard/RanksTable";
import TotalPoints from "@/components/leaderboard/totalpoints";
import { useSession, SessionProvider } from "next-auth/react";

const Leaderboard = () => {

  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>; // Suspense content can be added here
  }

  if (!session || !session.user) {
    return <p>You need to be logged in to access your profile.</p>;
  }

  const userdat = session.user as { name: string; domain: string; };

  return (
    <div className=" bg-gradient-to-tr from-blue-700 via-black to-red-700 h-screen p-4">
      <div className="grid grid-cols-6 gap-2 h-full w-full">
        <div className="col-span-3 flex items-center justify-center h-full rounded-lg">
        <div className="flex flex-col w-full">  {/* Wrapper for inner divs */}
          <div className="h-2/3 flex items-center justify-center">  {/* Top box (2/3 height) */}
            <span className="text-white text-md">
              <Tab />
            </span>
        </div>
      <div className="h-1/3 flex items-center justify-center">  {/* Bottom box (1/3 height) */}
        <div className="col-span-3 flex items-center justify-center h-full rounded-lg">
              <span className="text-white text-md">
                <TotalPoints LifeTimepts={0} SemesterPts={0} AcademicYearPts={0} />
              </span>
            </div>
          </div>
        </div>
      </div>
          <div className="col-span-2 flex items-center justify-center h-full rounded-lg">
            <span className="text-white text-md">
              <RanksTable userDomain={userdat.domain} presentUser={userdat.name} />
            </span>
          </div>
      </div>
    </div>
  )
};

export default function LeaderboardPage() {
  return (
    <SessionProvider>
      <Leaderboard />
    </SessionProvider>
  )
}
