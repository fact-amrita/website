"use client"

import React, { useState, useEffect } from 'react';
import { usersFind } from "@/lib/UserFetch";

// Interface for photo data
interface Result {
  id: string;
  name: string;
  image: string;
  role: string;
  FactID: string;
}

const App: React.FC = () => {

  const [results, setResults] = useState<Result>([]);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchResults = await usersFind(event.target.value);
    setResults(searchResults);
  }

  if (!results) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-white">FACT Directory Search</h1>
      <div className="mb-4 content-center items-center place-items-center">
        <input
          type="text"
          placeholder="Search by name or ID"
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-4 gap-4 p-4">
        {results.map(result => (
          <div key={result.id} className="border border-gray-300 p-4 rounded-lg bg-white">
            <div className="text-center">
              <img src={result.image} alt={result.name} className="w-10 rounded-full mb-2" />
              {result.role !== "member" && <div>{result.Title}</div>}
              <div>{result.name}</div>
              <div>ID: {result.FactID}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

