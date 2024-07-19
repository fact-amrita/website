"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SessionProvider, useSession } from 'next-auth/react';

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  if (!session || !session.user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">You need to be logged in to access your profile.</div>
      </div>
    );
  }

  const userdat = session.user as { name: string; email: string; role: string; image: string; };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 ml-2 md:ml-3">
      <div className="w-full md:w-1/4 bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-8 ml-10 text-center">Admin Panel</h1>
        <div className="space-y-4 justify-center items-center ml-5">
          <button
            className="w-full p-6 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => handleNavigation('/app/administration/createannouncement')}
          >
            Create an Announcement
          </button>
          {userdat.role === "admin" && (
            <button
              className="w-full p-8 sm:p-6 md:p-6 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300"
              onClick={() => handleNavigation('/app/administration/createevent')}
            >
              Create Events
            </button>
          )}
          <button
            className="w-full p-8 sm:p-6 md:p-6 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
            onClick={() => handleNavigation('/app/ticket/ticket-table')}
          >
            Review Tickets
          </button>
          <button
            className="w-full p-8 sm:p-6 md:p-6 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition duration-300"
            onClick={() => window.location.href = '/app/tasks/create'}
          >
            Add New Tasks
          </button>
          <button
            className="w-full p-8 sm:p-6 md:p-6 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition duration-300"
            onClick={() => handleNavigation('/app/administration/addtimeline')}
          >
            Add Important Dates to Calendar
          </button>
          {userdat.role === "admin" && (
            <button
              className="w-full p-8 sm:p-4 md:p-6 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition duration-300"
              onClick={() => handleNavigation('/app/administration/changesemester')}
            >
              Change Semester
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 md:p-0">
        <div className="animation-container text-center">
          <div className="animate-bounce bg-blue-500 p-4 rounded-full text-white mb-4">
            This is Admin Page
          </div>
          {/* <div className="animate-spin bg-green-500 p-4 rounded-full text-white mb-4">
            is
          </div>
          <div className="animate-pulse bg-red-500 p-4 rounded-full text-white mb-4">
            admin
          </div>
          <div className="animate-ping bg-yellow-500 p-4 rounded-full text-white">
            page
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default function AdminPageWithSession() {
  return (
    <SessionProvider>
      <AdminPage />
    </SessionProvider>
  );
}
