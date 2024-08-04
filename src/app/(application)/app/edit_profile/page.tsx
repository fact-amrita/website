"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useSession, SessionProvider } from 'next-auth/react';
import { getUserByFactID } from "@/lib/UserFetch";
import { updateProfile } from "@/lib/UserOperations";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Define a type for the keys of the formData object
type TechKey = 'ReactExp' | 'NodeExp' | 'HTMLCSSExp' | 'PythonExp' | 'JSExp';

const UserProfileEdit: React.FC = () => {
  const { data: session, status } = useSession();
  const MySwal = withReactContent(Swal);

  const [formData, setFormData] = useState({
    Name: '',
    LinkedinProfile: '',
    GithubProfile: '',
    About: '',
    ReactExp: '',
    NodeExp: '',
    HTMLCSSExp: '',
    PythonExp: '',
    JSExp: '',
  });

  const [selectedTech, setSelectedTech] = useState<TechKey | ''>('');
  const [selectedExp, setSelectedExp] = useState<string>('');

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
            About: userData.About || '',
            ReactExp: userData.ReactExp || '',
            NodeExp: userData.NodeExp || '',
            HTMLCSSExp: userData.HTMLCSSExp || '',
            PythonExp: userData.PythonExp || '',
            JSExp: userData.JSExp || ''
          });
        }
      }
    };
    fetchingData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTechChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const tech = e.target.value as TechKey;
    setSelectedTech(tech);
    setSelectedExp(formData[tech] || '');
  };

  const handleExpChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const exp = e.target.value;
    setSelectedExp(exp);
    if (selectedTech) {
      setFormData({ ...formData, [selectedTech]: exp === '' ? null : exp });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const factId = window.localStorage.getItem('factId');
    if (!factId) {
      return;
    }
    const output = await updateProfile(factId, formData);
    if (output) {
      MySwal.fire({
        title: "Successful!",
        text: "Profile Updated Successfully",
        icon: "success"
      });
    } else {
      MySwal.fire({
        title: "Failed!",
        text: "Profile Update Failed",
        icon: "error"
      });
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
      <form onSubmit={handleSubmit}>
        <div className="max-w-4xl mx-auto bg-white p-8 mt-10 shadow-lg rounded-lg flex">
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">Edit User Profile</h2>

            <div className="mb-6">
              <label className="block text-gray-700">Name</label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">LinkedIn Profile URL</label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                type="text"
                name="LinkedinProfile"
                value={formData.LinkedinProfile}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">GitHub Profile URL</label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                type="text"
                name="GithubProfile"
                value={formData.GithubProfile}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">About You</label>
              <textarea
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                name="About"
                value={formData.About}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-1/2 pl-4">
          <h2 className="text-2xl font-bold mb-4">Edit Skills</h2>
            <div className="mb-6">
              <label className="block text-gray-700">Select Technology</label>
              <select
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                value={selectedTech}
                onChange={handleTechChange}
              >
                <option value="">Select a Technology</option>
                <option value="ReactExp">React</option>
                <option value="NodeExp">Node JS</option>
                <option value="JSExp">JavaScript</option>
                <option value="HTMLCSSExp">HTML/CSS</option>
                <option value="PythonExp">Python</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700">Select Experience Level</label>
              <select
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                value={(selectedExp === null || selectedExp === "null") ? '' : selectedExp} // Set to empty string if null
                onChange={handleExpChange}
                disabled={!selectedTech}
              >
                <option value="">None</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default function UserProfileEditSession() {
  return (
    // <SessionProvider>
      <UserProfileEdit />
    // </SessionProvider>
  );
}
