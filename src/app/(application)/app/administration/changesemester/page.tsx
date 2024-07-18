"use client";

import React, { useState } from 'react';
import ErrorBoundary from '@/components/errorboundary';
import { changeSemester } from "@/lib/AdminOps";

const YearSemesterForm: React.FC = () => {
    const [year, setYear] = useState<string | ''>('');
    const [semester, setSemester] = useState<number | ''>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (year === '' || semester === '') {
            alert("Please fill all the fields");
            return;
        }
        if (year.length !== 2) {
            alert("Year should be of 2 digits");
            return;
        }
            // console.log(`Year: ${year}, Semester: ${semester}`);
            const result = await changeSemester(year, semester.toString());
            if (result) {
                alert("Semester changed successfully");
            } else {
                alert("Failed to change semester");
            }
        };

        return (
            <ErrorBoundary>
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-center">Update present semester of Users</h2>
                        <div className="mb-4">
                            <label htmlFor="year" className="block text-gray-700 mb-2">
                                Year
                            </label>
                            <input
                                type="number"
                                id="year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="semester" className="block text-gray-700 mb-2">
                                Semester
                            </label>
                            <input
                                type="number"
                                id="semester"
                                value={semester}
                                onChange={(e) => setSemester(Number(e.target.value))}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </ErrorBoundary>
        );
    };

    export default YearSemesterForm;
