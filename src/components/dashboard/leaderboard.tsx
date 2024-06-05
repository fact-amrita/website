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
        // Example fetching leaderboard data
        // const response = await axios.get<LeaderboardEntry[]>('/api/leaderboard');
        // setEntries(response.data);

        // Mock data for demonstration
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
    <div className="flex fixed top-0 right-0 h-full w-72 bg-indigo-800 bg-opacity-20 text-white z-50 justify-center">
      <div className="p-4 justify-center">
        <h2 className="text-xl font-bold mb-4 justify-center">Leaderboard</h2>
        <div className="px-4 py-2">
          <table className=" flex flex-col min-w-full table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">Rank</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.rank} className="hover:bg-blue-300">
                  <td className="px-4 py-2">{entry.rank}</td>
                  <td className="px-4 py-2">{entry.name}</td>
                  <td className="px-4 py-2">{entry.points}</td>
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
