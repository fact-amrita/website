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

const Leaderboard: React.FC<LeaderBoardInterface> = ({ domain }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboardData = await getLeaderboard(domain);

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
  }, [domain]);

  return (
    <div className="fixed top-0 mt-0 right-0 h-full bg-gradient-to-tr from-blue-700 via-black to-red-700 text-white flex justify-center items-center w-full sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/4">
      <div className="p-3 w-full overflow-hidden mb-6">
        <h2 className="text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center mb-4">
          LEADERBOARD
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-center">
            <thead>
              <tr>
                <th className="py-2 px-3 text-left text-md sm:text-sm md:text-md lg:text-md xl:text-md">
                  Rank
                </th>
                <th className="py-2 px-3 text-left text-md sm:text-sm md:text-md lg:text-md xl:text-md">
                  Name
                </th>
                <th className="py-2 px-3 text-left text-md sm:text-sm md:text-md lg:text-md xl:text-md">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => {
                let hoverColor = "";
                let emoji = "";

                switch (entry.rank) {
                  case 1:
                    hoverColor = "hover:bg-yellow-500";
                    emoji = "🥇";
                    break;
                  case 2:
                    hoverColor = "hover:bg-gray-400";
                    emoji = "🥈";
                    break;
                  case 3:
                    hoverColor = "hover:bg-yellow-700";
                    emoji = "🥉";
                    break;
                  default:
                    hoverColor = "hover:bg-blue-800";
                    break;
                }

                return (
                  <tr key={entry.rank} className={`transition duration-200 ${hoverColor} border-b border-gray-700`}>
                    <td className="px-4 py-2 text-md sm:text-sm md:text-md lg:text-md xl:text-md">
                      {(entry.rank < 4) && <span style={{ fontSize: "22px" }}>{emoji}</span>} {(entry.rank > 4) && <span>{entry.rank}</span>}
                    </td>
                    <td className="px-4 py-2 text-md sm:text-sm md:text-md lg:text-md xl:text-md">
                      {entry.name}
                    </td>
                    <td className="px-4 py-2 text-md sm:text-sm md:text-md lg:text-md xl:text-md">
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
