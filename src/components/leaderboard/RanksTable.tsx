"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getLeaderboard } from '@/lib/leaderboards';

const RanksTable = ({ userDomain, presentUser }: { userDomain: string, presentUser: string }) => {

  const [leaders, setLeaders] = useState<any>();

  useEffect(() => {
    const LeaderboardGetter = async () => {
      try {
        const data = await getLeaderboard(userDomain);
        console.log(data);
        if (!data) { setLeaders("not found"); return; }
        setLeaders(data);
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };
    LeaderboardGetter();
  }, [userDomain]);

  if (!leaders) {
    return <p>Loading...</p>;
  }

  if (leaders == "not found") {
    console.log("No data found");
  }

  return (
    <div className="bg-gradient-to-tl from-blue-700 via-black to-red-700 p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-center text-white text-xl mb-4">Leaderboard</h2>
      <div className="bg-gradient-to-tr from-blue-700 via-black to-red-700 p-4">
        <div className="flex justify-around mb-4">
          {leaders.slice(0, 3).map((leader: any, index: any) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                {leader.position === 1 && (
                  <span className="absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-green-500 text-white p-1 rounded-full">
                  </span>
                )}
              </div>
              <span className="text-white mt-2">{leader.name}</span>
              <span className="text-white">{leader.points} pts</span>
            </div>
          ))}
        </div>
        {leaders.slice(3).map((leader: any, index: any) => (
          <div
            key={index}
            className={`flex items-center justify-between py-2 px-4 ${leader.name === presentUser ? 'bg-green-500' : 'bg-gray-700'} rounded-lg mb-2 hover:bg-green-500`}
          >
            <div className="flex items-center">
              <Image
                src={leader.image}
                alt={leader.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-4 text-white">{leader.name}</span>
            </div>
            <span className="text-white">{leader.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RanksTable;
