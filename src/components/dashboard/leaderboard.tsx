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
        ];
        setEntries(mockEntries);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="fixed top-0 right-0 h-full bg-gradient-to-tr from-blue-700 via-black to-red-700 text-white flex justify-center items-center sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <div className="p-3 w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Leaderboard</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-lg md:text-xl">Rank</th>
                <th className="py-2 px-4 text-left text-lg md:text-xl">Name</th>
                <th className="py-2 px-4 text-left text-lg md:text-xl">Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.rank} className="hover:bg-blue-800">
                  <td className="px-4 py-2 text-lg md:text-xl">{entry.rank}</td>
                  <td className="px-4 py-2 text-lg md:text-xl">{entry.name}</td>
                  <td className="px-4 py-2 text-lg md:text-xl">{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
