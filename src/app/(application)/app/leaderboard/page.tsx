"use client";

import React, { useEffect, useState } from "react";
import Tab from "@/components/leaderboard/Tab";
import RanksTable from "@/components/leaderboard/RanksTable";
import TotalPoints from "@/components/leaderboard/totalpoints";
import BonusPenaltyPoints from "@/components/leaderboard/bonuspenaltypoints";
import TableComponent from '@/components/TableComponent';
import { useSession } from "next-auth/react";
import { getLifetimePoints, getYearPoints, getSemesterPoints } from "@/lib/TaskOperations";
import { YearBonusPenaltyList, SemesterBonusPenaltyList, LifetimeBonusPenaltyList } from "@/lib/UserOperations";

const LeaderboardPage = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<string>('lifetime');

  const [LifetimeList, setLifetimeList] = useState<any>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const [YearList, setYearList] = useState<any>([]);
  const [YearPoints, setYearPoints] = useState(0);

  const [SemList, setSemList] = useState<any>([]);
  const [SemPoints, setSemPoints] = useState(0);

  const [SemBonusPenalty, setSemBonusPenalty] = useState<any>([]);
  const [YearBonusPenalty, setYearBonusPenalty] = useState<any>([]);
  const [LifetimeBonusPenalty, setLifetimeBonusPenalty] = useState<any>([]);
  const [ActiveBonusPenalty, setActiveBonusPenalty] = useState<any>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const factId = window.localStorage.getItem('factId') || '';
        const [{ list, points }, { yearlist, yearpoints }, { semlist, sempoints }] = await Promise.all([
          getLifetimePoints(factId),
          getYearPoints(factId),
          getSemesterPoints(factId),
        ]);

        setLifetimeList(list);
        setTotalPoints(points);

        setYearList(yearlist);
        setYearPoints(yearpoints);

        setSemList(semlist);
        setSemPoints(sempoints);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBonusPenaltyData = async () => {
      try {
        const factId = window.localStorage.getItem('factId') || '';

        const list = await LifetimeBonusPenaltyList(factId);
        setLifetimeBonusPenalty(list);

        const yearlist = await YearBonusPenaltyList(factId);
        setYearBonusPenalty(yearlist);

        const semlist = await SemesterBonusPenaltyList(factId);
        setSemBonusPenalty(semlist);

        setActiveBonusPenalty(list);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchBonusPenaltyData();
  }, []);

  useEffect(() => {
    if (activeTab === 'lifetime') {
      setActiveBonusPenalty(LifetimeBonusPenalty);
    } else if (activeTab === 'year') {
      setActiveBonusPenalty(YearBonusPenalty);
    } else if (activeTab === 'semester') {
      setActiveBonusPenalty(SemBonusPenalty);
    }
  }, [activeTab]);

  if (status === 'loading' || loading) {
    return <p>Loading...</p>;
  }

  if (!session || !session.user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">You need to be logged in to access your profile.</div>
      </div>
    );
  }

  const userdat = session.user as { name: string; domain: string; factId: string };

  return (
    <div className="flex flex-col items-center bg-transparent rounded shadow-lg w-[90%] h-[90%] max-w-7xl p-4 mx-auto overflow-x-hidden">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="w-full">
          <Tab LifetimeList={LifetimeList} YearList={YearList} SemList={SemList} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="w-full">
          <RanksTable userDomain={userdat.domain} presentUser={userdat.name} activeTab={activeTab} />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        <div className="w-full">
          <BonusPenaltyPoints activeTab={activeTab} factId={userdat.factId} />
        </div>
        <div className="w-full">
          <TotalPoints LifeTimepts={totalPoints} SemesterPts={SemPoints} AcademicYearPts={YearPoints} />
        </div>
      </div>

      <div className="mr-5">
        <TableComponent data={ActiveBonusPenalty} />
      </div>
    </div>
  );
};

export default LeaderboardPage;
