"use client";

import React from "react";
import Tab from "@/components/leaderboard/Tab";
import RanksTable from "@/components/leaderboard/RanksTable";
import TotalPoints from "@/components/leaderboard/totalpoints";
import { useSession, SessionProvider } from "next-auth/react";

const LeaderboardPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session || !session.user) {
    return <div className="flex justify-center items-center h-screen">
      <div className="text-red-500 text-2xl">You need to be logged in to access your profile.</div>
    </div>;
  }

  const userdat = session.user as { name: string; domain: string; };

  return (
    <div className="grid grid-cols-8 grid-rows-1 bg-transparent rounded shadow-lg w-full h-full ml-18 ">
      <div className="col-span-5 row-span-1 ml-20 mt-4">
        <Tab />
      </div>
      <div className="col-span-3 row-span-1 mr-0 mt-2" >
        <RanksTable userDomain={userdat.domain} presentUser={userdat.name} />
      </div>
      <div className="col-span-5 row-span-3 ml-20">
        <TotalPoints LifeTimepts={0} SemesterPts={0} AcademicYearPts={0} />
      </div>
    </div>
  );
};

const LeaderboardWrapper = () => {
  return (
    <SessionProvider>
      <LeaderboardPage />
    </SessionProvider>
  );
};

export default LeaderboardWrapper;
