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
        <div className="flex flex-col bg-gradient-to-tr from-blue-700 via-black to-red-700 p-2 rounded-lg w-80 ml-40 h-full min-h-fit">
          <h2 className="text-center text-white text-2xl mb-4">Leaderboard</h2>
            {leaders.length > 0 ? (
              <div className="space-y-3">
                {leaders.map((leader: any, index: number) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between py-2 px-2 ${leader.name === presentUser ? 'bg-green-500' : 'bg-gray-700'} rounded-lg hover:bg-green-500`}
                  >
                    <div className="flex items-center space-x-1">
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      <span className="text-white">{leader.name}</span>
                    </div>
                    <span className="text-white ">{leader.points} pts</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white text-center">Loading...</p>
            )}
          </div>
    );
  }

  export default RanksTable;
