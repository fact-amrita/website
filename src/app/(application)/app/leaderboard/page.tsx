"use client";

import React, { useEffect, useState } from "react";
import Tab from "@/components/leaderboard/Tab";
import RanksTable from "@/components/leaderboard/RanksTable";
import TotalPoints from "@/components/leaderboard/totalpoints";
import { useSession, SessionProvider } from "next-auth/react";
import { getLifetimePoints, getYearPoints, getSemesterPoints } from "@/lib/TaskOperations";

const LeaderboardPage = () => {
  const { data: session, status } = useSession();

  const [LifetimeList, setLifetimeList] = useState<any>([]);
  const [totalpoints, setTotalPoints] = useState(0);

  const [YearList, setYearList] = useState<any>([]);
  const [YearPoints, setYearPoints] = useState(0);

  const [SemList, setSemList] = useState<any>([]);
  const [SemPoints, setSemPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { list, points } = await getLifetimePoints(window.localStorage.getItem('factId') || '');
        setLifetimeList(list);
        setTotalPoints(points);

        const { yearlist, yearpoints } = await getYearPoints(window.localStorage.getItem('factId') || '');
        setYearList(yearlist);
        setYearPoints(yearpoints);

        const { semlist, sempoints } = await getSemesterPoints(window.localStorage.getItem('factId') || '');
        setSemList(semlist);
        setSemPoints(sempoints);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

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
        <Tab LifetimeList={LifetimeList} YearList={YearList} SemList={SemList} />
      </div>
      <div className="col-span-3 row-span-1 mr-0 mt-2" >
        <RanksTable userDomain={userdat.domain} presentUser={userdat.name} />
      </div>
      <div className="col-span-5 row-span-3 ml-20">
        <TotalPoints LifeTimepts={totalpoints} SemesterPts={SemPoints} AcademicYearPts={YearPoints} />
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
