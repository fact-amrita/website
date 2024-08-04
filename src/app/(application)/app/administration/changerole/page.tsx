"use client";

import React, { useState } from 'react';
import ErrorBoundary from '@/components/errorboundary';
import { assignRole } from "@/lib/UserOperations";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const YearSemesterForm: React.FC = () => {
    const MySwal = withReactContent(Swal)
    const [factId, setFactId] = useState<string | ''>('');
    const [role, setRole] = useState<string | ''>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (factId === '' || role === '') {
            MySwal.fire({
                title: "Empty fields detected !",
                text: "Please fill in all fields",
                icon: "error"
            });
            return;
        }
        if (factId.length !== 14) {
            MySwal.fire({
                title: "Validation Failure !",
                text: "FACT Id should be of 14 digits",
                icon: "error"
            });
            return;
        }
        const result = await assignRole(factId, role);
        if (result) {
            MySwal.fire({
                title: "Operation Successful !",
                text: "Role changed successfully",
                icon: "success"
            });
        } else {
            MySwal.fire({
                title: "Operation Failed !",
                text: "Failed to change role, check the FACT Id entered",
                icon: "error"
            });
        }
    };

    return (
        <ErrorBoundary>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">Update role of User</h2>
                    <div className="mb-4">
                        <label htmlFor="factId" className="block text-gray-700 mb-2">
                            FACT ID <br />
                        </label>
                        <input
                            type="text"
                            id="factId"
                            value={factId.toUpperCase()}
                            onChange={(e) => setFactId(e.target.value.toUpperCase())}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="semester" className="block text-gray-700 mb-2">
                            Role
                        </label>
                        <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100" value={role} onChange={(e) => { setRole(e.target.value) }}>
                            <option value="member">Member</option>
                            <option value="moderator">Moderator</option>
                            <option value="newbie">Newbie</option>
                        </select>
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
