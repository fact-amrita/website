"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useSession, SessionProvider } from 'next-auth/react';
import { getUserByFactID } from "@/lib/UserFetch";
import { updateProfile } from "@/lib/UserOperations";

const UserProfileEdit: React.FC = () => {
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    Name: '',
    LinkedinProfile: '',
    GithubProfile: '',
  });

  useEffect(() => {
    const fetchingData = async () => {
      const factId = window.localStorage.getItem('factId');
      if (factId) {
        const userData = await getUserByFactID(factId);
        if (userData) {
          setFormData({
            Name: userData.name,
            LinkedinProfile: userData.linkedInURL || '',
            GithubProfile: userData.githubURL || '',
          });
        }
      }
    }
    fetchingData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const factId = window.localStorage.getItem('factId');
    if (!factId) {
      return;
    }
    const output = await updateProfile(factId, formData.Name, formData.GithubProfile, formData.LinkedinProfile);
    if (output) {
      alert('Profile updated successfully');
    } else {
      alert('Error updating profile');
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session || !session.user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">You need to be logged in to access your profile.</div>
      </div>
    );
  }
  const userdat = session.user as { name: string; email: string; role: string; image: string; domain: string; factId: string; };
  if (!userdat.factId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">You do not have a profile with us.</div>
      </div>
    );
  }

  return (
    <div className='justify-center items-center'>
      <div className="max-w-md mx-auto bg-white p-8 mt-10 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700"> Name</label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700"> LinkedIn Profile URL</label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              type="text"
              name="LinkedinProfile"
              value={formData.LinkedinProfile}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">GitHub Profile URL</label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              type="text"
              name="GithubProfile"
              value={formData.GithubProfile}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default function UserProfileEditSession() {
  return (
    <SessionProvider>
      <UserProfileEdit />
    </SessionProvider>
  );
}
