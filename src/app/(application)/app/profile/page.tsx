"use client"

import React, { useState, useEffect } from 'react';
import { usersFind } from "@/lib/UserFetch";
import styles from './page.module.css';

interface Result {
  id: string;
  name: string;
  image: string | null;
  role: string;
  FactID: string;
  Title: string | null;
}

const App: React.FC = () => {

  const [results, setResults] = useState<Result[]>([]);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchResults = await usersFind(event.target.value);
    setResults(searchResults);
  }

  if (!results) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-20 mt-8">
      <h1 className="text-3xl font-bold mb-4 text-white">FACT Directory Search</h1>
      <div className="mb-4 content-center items-center place-items-center">
        <input
          type="text"
          placeholder="Search by name or ID"
          onChange={handleSearch}
          className={styles.input}
          style={{ color: 'white' }}
        />
      </div>
      <div className="grid grid-cols-4 gap-4 p-4">
        {results.map(result => (
          <div key={result.id} className={`border border-gray-300 p-4 rounded-tr-3xl rounded-bl-3xl bg-white ${result.FactID === window.localStorage.getItem('factId') ? 'shadow-slate-600 shadow-md hover:shadow-yellow-600' : ''}`}>
            <div className="text-center">
              <table>
                <tr>
                  <td><img src={result.image} alt={result.name} className="w-10 rounded-full mb-2" /></td>
                  <td style={{ width: "75%" }}>
                    <div style={{ marginLeft: "20px" }}>
                      {result.role !== "member" && <div>{result.Title}</div>}
                      <div>{result.name}</div>
                      <div>ID: {result.FactID}</div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

