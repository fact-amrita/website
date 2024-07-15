"use client";

import React, { useEffect, useState } from "react";
import { getLeaderboard } from "@/lib/leaderboards";

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
}

interface LeaderBoardInterface {
  domain: string;
}

const Leaderboard: React.FC<LeaderBoardInterface> = (domain) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const mockEntries: LeaderboardEntry[] = [
          { rank: 1, name: "Alice", points: 1000 },
          { rank: 2, name: "Bob", points: 950 },
          { rank: 3, name: "Charlie", points: 900 },
          { rank: 4, name: "David", points: 850 },
          { rank: 5, name: "Eve", points: 800 },
          { rank: 6, name: "Frank", points: 750 },
          { rank: 7, name: "Grace", points: 700 },
          { rank: 8, name: "Hank", points: 650 },
          { rank: 9, name: "Ivy", points: 600 },
          { rank: 10, name: "Jack", points: 550 },
        ];
        const leaderboardData = await getLeaderboard(domain.domain);

        const leaderboardDataWithRank = leaderboardData.map((entry, index) => ({
          ...entry,
          rank: index + 1,
        }));

        setEntries(leaderboardDataWithRank);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="fixed top-0 mt-0 right-0 h-full bg-gradient-to-tr from-blue-700 via-black to-red-700 text-white flex justify-center items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <div className="p-3 w-full overflow-hidden mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-4">
          Leaderboard
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="py-2 px-3 text-left text-sm sm:text-base md:text-md lg:text-lg xl:text-xl">
                  Rank
                </th>
                <th className="py-2 px-3 text-left text-sm sm:text-base md:text-md lg:text-lg xl:text-xl">
                  Name
                </th>
                <th className="py-2 px-1 text-left text-sm sm:text-base md:text-md lg:text-lg xl:text-xl">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => {
                let hoverColor = "";

                switch (entry.rank) {
                  case 1:
                    hoverColor = "hover:bg-yellow-500";
                    break;
                  case 2:
                    hoverColor = "hover:bg-gray-400";
                    break;
                  case 3:
                    hoverColor = "hover:bg-yellow-700";
                    break;
                  default:
                    hoverColor = "hover:bg-blue-800";
                    break;
                }

                return (
                  <tr key={entry.rank} className={`transition duration-200 ${hoverColor}`}>
                    <td className="px-4 py-2 text-sm sm:text-base md:text-md lg:text-lg xl:text-xl">
                      {entry.rank}
                    </td>
                    <td className="px-4 py-2 text-sm sm:text-base md:text-md lg:text-lg xl:text-xl">
                      {entry.name}
                    </td>
                    <td className="px-4 py-2 text-sm sm:text-base md:text-md lg:text-lg xl:text-xl">
                      {entry.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
