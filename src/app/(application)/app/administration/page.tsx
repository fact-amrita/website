"use client"

import React from 'react';


const AdminPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/4 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <div className="space-y-4">
          <button className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Create an Announcement
          </button>
          <button className="w-full p-4 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300" onClick={() => window.location.href='/app/administration/factcreate'}>
            Create Daily Dose of Fact
          </button>
          <button className="w-full p-4 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300">
            Create Events
          </button>
          <button className="w-full p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition duration-300" onClick={() => window.location.href='/app/tasks/create'}>
            Create New Task
          </button>
          <button className="w-full p-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition duration-300">
            Create Important Date on Calendar
          </button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="animation-container">
          <div className="animate-bounce bg-blue-500 p-4 rounded-full text-white mb-4">
            This
          </div>
          <div className="animate-spin bg-green-500 p-4 rounded-full text-white mb-4">
            is 
          </div>
          <div className="animate-pulse bg-red-500 p-4 rounded-full text-white mb-4">
            admin
          </div>
          <div className="animate-ping bg-yellow-500 p-4 rounded-full text-white">
            page
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;