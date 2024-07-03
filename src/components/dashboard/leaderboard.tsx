"use client";

import React, { useEffect, useState } from 'react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
}

const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const mockEntries: LeaderboardEntry[] = [
          { rank: 1, name: 'Alice', points: 1000 },
          { rank: 2, name: 'Bob', points: 950 },
          { rank: 3, name: 'Charlie', points: 900 },
          { rank: 4, name: 'David', points: 850 },
          { rank: 5, name: 'Eve', points: 800 },
          { rank: 6, name: 'Eve', points: 800 },
          { rank: 7, name: 'Eve', points: 800 },
          { rank: 8, name: 'Eve', points: 800 },
          { rank: 9, name: 'Eve', points: 800 },
          { rank: 10, name: 'Eve', points: 800 },
        ];
        setEntries(mockEntries);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="fixed top-0 mt-0 right-0 h-full bg-gradient-to-tr from-blue-700 via-black to-red-700 text-white flex justify-center items-center sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <div className="p-3 w-full overflow-hidden mb-6">
        <h2 className="text-xl  md:text-lg sm:text-md lg:text-xl xl:text-2xl font-bold text-center mb-4">Leaderboard</h2>
        <div className="overflow-hidden">
        <table className="table-auto mt-0 w-full">
  <thead>
    <tr>
      <th className="py-2 px-4 text-left text-lg md:text-lg sm:text-md lg:text-xl xl:text-2xl">Rank</th>
      <th className="py-2 px-4 text-left text-lg md:text-lg sm:text-md lg:text-xl xl:text-2xl">Name</th>
      <th className="py-2 px-4 text-left text-lg md:text-lg sm:text-md lg:text-xl xl:text-2xl">Points</th>
    </tr>
  </thead>
  <tbody>
    {entries.map((entry) => {
      let bgColor = '';
      let hoverColor = '';

      switch (entry.rank) {
        case 1: 
          hoverColor = 'hover:bg-gold-700';
          break;
        case 2:
          hoverColor = 'hover:bg-silver-700';
          break;
        case 3:
          hoverColor = 'hover:bg-bronze-700';
          break;
        default:
          hoverColor = 'hover:bg-blue-800';
          break;
      }

      return (
        <tr key={entry.rank} className={`${bgColor} ${hoverColor}`}>
          <td className="px-4 py-2 text-lg md:text-lg sm:text-md lg:text-xl xl:text-2xl">{entry.rank}</td>
          <td className="px-4 py-2 text-lg md:text-lg sm:text-md lg:text-xl xl:text-2xl">{entry.name}</td>
          <td className="px-4 py-2 text-lg md:text-lg sm:text-md lg:text-xl xl:text-2xl">{entry.points}</td>
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
