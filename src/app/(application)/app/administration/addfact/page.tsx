"use client";

import { useState, ChangeEvent, useEffect } from 'react';
import { getFACTs, addToFACT, deleteFACT } from "@/lib/AdminOps";

interface FACTs {
    id: string;
    Fact: string;
    Date: string;
    Creator: string | null;
}

const FACTofTheDay = () => {
    const [facts, setFacts] = useState<FACTs[]>([]);
    const [title, setTitle] = useState<string>('');
    const [date, setDate] = useState<string>('');

    const factId = window.localStorage.getItem('factId');

    const addEvent = async () => {
        if (title.trim() && date.trim()) {
            const DBFacts = await addToFACT(title.trim(), date.trim(), factId || "");
            setFacts(DBFacts);
            setTitle('');
            setDate('');
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            const DBFacts = await getFACTs();
            setFacts(DBFacts);
        };

        fetchEvents();
    }, []);

    const deleteEvent = async (id: string) => {
        const DBFacts = await deleteFACT(id);
        setFacts(DBFacts);
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-red-200 via-purple-300 to-sky-300 p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-4">FACT of the Day</h1>
                <div className="flex flex-col mb-4 space-y-2">
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        className="border rounded p-2 flex-grow"
                        placeholder="Add new FACT of the Day"
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        className="border rounded p-2 flex-grow"
                    />
                    <button
                        onClick={addEvent}
                        className="bg-blue-500 text-white p-2 rounded mt-2"
                    >
                        Add
                    </button>
                </div>
                <ul>
                    {facts.map(fact => (
                        <li key={fact.id} className="mb-2 flex justify-between items-center">
                            <span>{fact.Date} - {fact.Fact}</span>
                            <button
                                onClick={() => deleteEvent(fact.id)}
                                className="bg-red-500 text-white p-1 rounded"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FACTofTheDay;
