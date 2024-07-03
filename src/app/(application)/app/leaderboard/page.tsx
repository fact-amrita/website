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
    return <p>You need to be logged in to access your profile.</p>;
  }

  const userdat = session.user as { name: string; domain: string; };

  return (
    <div className="h-full bg-gradient-to-tr from-blue-700 via-black to-red-700 flex flex-col ">
      <Tab />
      <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-center mt-4">
        <TotalPoints LifeTimepts={0} SemesterPts={0} AcademicYearPts={0} />
        <RanksTable userDomain={userdat.domain} presentUser={userdat.name} />
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
