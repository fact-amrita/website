"use client";

import React, { useState, useEffect } from 'react';
import { usersFind } from "@/lib/UserFetch";
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface Result {
  id: string;
  name: string;
  image: string | null;
  role: string;
  FactID: string;
  Title: string | null;
}

const ProfilePage: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [storedFactId, setStoredFactId] = useState<string | null>(null);

  useEffect(() => {
    const loadDefaultResults = async () => {
      try {
        const searchResults = await usersFind('');
        setResults(searchResults);
      } catch (error) {
        console.error("Error loading default results:", error);
      }
    };

    loadDefaultResults();
    setStoredFactId(window.localStorage.getItem('factId'));
  }, []);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const searchResults = await usersFind(event.target.value);
      setResults(searchResults);
    } catch (error) {
      console.error("Error handling search:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-4 text-white text-center">FACT Profile Search</h1>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or ID"
          onChange={handleSearch}
          className={`${styles.input} w-full max-w-lg p-2`}
          style={{ color: 'white' }}
        />
      </div>
      <div className="overflow-y-auto scrollbar-thumb-sky-700 scrollbar-track-sky-300" style={{ height: '70vh', marginLeft:"3%" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ml-2">
          {results.map(result => (
            <Link href={`/app/profile/${result.FactID}`} key={result.id}>
              <div className={`border border-gray-300 p-3 rounded-tr-3xl rounded-bl-3xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 ${result.FactID === storedFactId ? 'shadow-slate-600 shadow-xl hover:shadow-yellow-600' : ''}`}
                style={{ width: '100%', height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className="text-center">
                  <Image src={result.image ?? ''} alt={result.name} width={70} height={70} className="w-10 rounded-full mb-2" />
                  <div style={{ marginTop: '10px' }}>
                    {result.role !== "member" && <div>{result.Title}</div>}
                    <div>{result.name}</div>
                    <div>ID: {result.FactID}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
