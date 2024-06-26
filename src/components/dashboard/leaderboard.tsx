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
    <div className="border-none flex fixed top-0 right-0 mx-10 h-full w-80 bg-gradient-to-tr from-blue-700 via-black to-red-700 bg-opacity-100 text-white justify-center">
      <div className="p-3 justify-center items-center mt-4">
        <h2 className="text-3xl font-bold text-center">Leaderboard</h2>
          <table className=" flex flex-col w-full justify-center items-center">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-2xl">Rank</th>
                <th className="py-2 px-4 text-left text-2xl">Name</th>
                <th className="py-2 px-4 text-left text-2xl">Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.rank} className="hover:bg-blue-800">
                  <td className="px-4 py-2 text-2xl">{entry.rank}</td>
                  <td className="px-4 py-2 text-2xl">{entry.name}</td>
                  <td className="px-4 py-2 text-2xl">{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default Leaderboard;
