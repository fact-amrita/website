import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getLeaderboard } from '@/lib/leaderboards';

const RanksTable = ({ userDomain, presentUser }: { userDomain: string, presentUser: string }) => {
  const [leaders, setLeaders] = useState<any[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard(userDomain);
        setLeaders(data || []);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };
    fetchLeaderboard();
  }, [userDomain]);

  return (
    <div className="flex flex-col bg-gradient-to-tr from-blue-700 via-black to-red-700 p-4 rounded-lg w-full max-w-md mx-auto h-full min-h-fit overflow-hidden">
      <h2 className="text-center text-white text-xl md:text-2xl mb-4">Leaderboard</h2>
      {leaders.length > 0 ? (
        <div className="space-y-3">
          {leaders.map((leader: any, index: number) => (
            <div
              key={index}
              className={`flex items-center justify-between py-2 px-3 ${leader.name === presentUser ? 'bg-green-500' : 'bg-gray-700'} rounded-lg hover:bg-green-600 transition duration-300`}
            >
              <div className="flex items-center space-x-2">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="text-white text-sm md:text-base">{leader.name}</span>
              </div>
              <span className="text-white text-sm md:text-base">{leader.points} pts</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-center text-sm md:text-base">Loading...</p>
      )}
    </div>
  );
}

export default RanksTable;
