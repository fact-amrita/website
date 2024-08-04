"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useSession, SessionProvider } from 'next-auth/react';
import { getUserByFactID } from "@/lib/UserFetch";
import { updateProfile } from "@/lib/UserOperations";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { TiDeleteOutline } from "react-icons/ti";

const UserProfileEdit: React.FC = () => {
  const { data: session, status } = useSession();
  const MySwal = withReactContent(Swal);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  const [formData, setFormData] = useState({
    Name: '',
    LinkedinProfile: '',
    GithubProfile: '',
    About: '',
    Skills: [] as string[]
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
            About: userData.About || '',
            Skills: userData.Skills || []
          });
          setSkills(userData.Skills);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const factId = window.localStorage.getItem('factId');
    setFormData({
      ...formData,
      Skills: skills
    })
    if (!factId) {
      return;
    }
    const output = await updateProfile(factId, { ...formData, Skills: skills });
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

  const addSkill = () => {
    if (newSkill.trim() !== '') {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index: any) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  return (
    <div className='justify-center items-center'>
      <form onSubmit={handleSubmit}>
        <div className="max-w-4xl mx-auto bg-white p-8 mt-10 shadow-lg rounded-lg flex flex-wrap">
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">Edit User Profile</h2>

            <div className="mb-6 flex flex-wrap">
              <label className="block text-gray-700">Name</label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6 flex flex-wrap">
              <label className="block text-gray-700">LinkedIn Profile URL</label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                type="text"
                name="LinkedinProfile"
                value={formData.LinkedinProfile}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6 flex flex-wrap">
              <label className="block text-gray-700">GitHub Profile URL</label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                type="text"
                name="GithubProfile"
                value={formData.GithubProfile}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6 flex flex-wrap">
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
            <div className="mb-6 flex flex-wrap">

              <div className="flex items-center mb-4 w-full">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => { e.preventDefault(); setNewSkill(e.target.value) }}
                  placeholder="Enter a skill"
                  className="border p-2 rounded mr-2 flex-grow"
                />
                <button
                  onClick={(e) => { e.preventDefault(); addSkill() }}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Add Skill
                </button>
              </div>
              <br />
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-gray-200 p-2 rounded flex items-center">
                    <span>{skill}</span>
                    <button
                      onClick={(e) => { e.preventDefault(); removeSkill(index) }}
                      className="ml-2 text-red-500"
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                ))}
              </div>
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
