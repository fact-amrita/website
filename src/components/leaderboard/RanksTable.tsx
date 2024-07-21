"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getLeaderboard, getYearLeaderboard, getSemesterLeaderboard } from '@/lib/leaderboards';
import { Player } from '@lottiefiles/react-lottie-player'; // import Lottie;
import Link from 'next/link';

const RanksTable = ({ activeTab, userDomain, presentUser }: { activeTab: string, userDomain: string, presentUser: string }) => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // add loading state
  const [currentPage, setCurrentPage] = useState<number>(1); // add current page state
  const [itemsPerPage] = useState<number>(5); // set items per page

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        let data;
        if (activeTab == 'semester') {
          data = await getSemesterLeaderboard(userDomain, window.localStorage.getItem('factId') || '');
        } else if (activeTab == 'academicYear') {
          data = await getYearLeaderboard(userDomain);
        } else {
          data = await getLeaderboard(userDomain);
        }
        setLeaders(data || []);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setIsLoading(false); // set loading to false once data is fetched
      }
    };

    fetchLeaderboard();
  }, [userDomain, activeTab]); // Only trigger fetch when userDomain changes

  const totalPages = Math.ceil(leaders.length / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentItems = leaders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col bg-gradient-to-tr from-blue-700 via-black to-red-700 p-4 rounded-lg w-full max-w-md mx-auto h-full min-h-fit overflow-hidden">
      <h2 className="text-center text-white text-xl md:text-2xl mb-4">Leaderboard</h2>
      {isLoading ? (
        <div className="flex justify-center">
          <Player
            autoplay
            loop
            src="https://lottie.host/4d948af6-47c6-4d38-ba2a-c3ccc40a11da/u8FaXDQiWk.json" // your Lottie animation URL
            style={{ height: '150px', width: '150px' }} // Adjust size as needed
          />
        </div>
      ) : (
        <>
          {leaders.length > 0 ? (
            <div className="space-y-3">
              {currentItems.map((leader: any, index: number) => (
                  <Link href={`/app/profile/${leader.FactID}`}
                    key={index}
                    className={`flex items-center justify-between py-2 px-3 ${leader.name === presentUser ? 'bg-green-500' : 'bg-slate-600'} rounded-lg hover:bg-green-600 transition duration-300`}
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
                    </Link>
              ))}
            </div>
          ) : (
            <p className="text-white text-center text-sm md:text-base">No leaders found.</p>
          )}
          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrevious}
              className="px-3 py-1 mx-1 bg-gray-700 text-white rounded-lg disabled:opacity-50"
              disabled={currentPage === 1}
            >
              {'<'}
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handleClick(index + 1)}
                className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-lg`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNext}
              className="px-3 py-1 mx-1 bg-gray-700 text-white rounded-lg disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              {'>'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RanksTable;
