import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
}

const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get<LeaderboardEntry[]>('/api/leaderboard');
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  return (
    <div className="max-w-lg mx-auto my-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div
          className="bg-gray-800 text-white p-4 flex justify-between items-center cursor-pointer"
          onClick={toggleLeaderboard}
        >
          <h2 className="text-xl font-bold">Leaderboard</h2>
          {showLeaderboard ? (
            <ChevronUpIcon className="h-6 w-6 text-white" />
          ) : (
            <ChevronDownIcon className="h-6 w-6 text-white" />
          )}
        </div>
        {showLeaderboard && (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200">Rank</th>
                <th className="py-2 px-4 bg-gray-200">Name</th>
                <th className="py-2 px-4 bg-gray-200">Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.rank} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{entry.rank}</td>
                  <td className="border px-4 py-2">{entry.name}</td>
                  <td className="border px-4 py-2">{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
