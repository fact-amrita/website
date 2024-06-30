"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { getUserProfile } from "@/lib/UserFetch";

// const skills = [
//   ['JavaScript', 'Advanced'],
//   ['React', 'Intermediate'],
//   ['HTML/CSS', 'Advanced'],
//   ['Node.js', 'Intermediate'],
//   ['Python', 'Intermediate']
// ];

const ProfileContent = ({ params }: { params: { id: string } }) => {

  const ProfileId = params.id;

  const [ProfileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const profileDataGetter = async () => {
      try {
        const data = await getUserProfile(ProfileId);
        if (!data) { setProfileData("not found"); return; }
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };
    profileDataGetter();
  }, [ProfileId]);

  if (!ProfileData) {
    return <p>Loading...</p>;
  }

  if (ProfileData == "not found") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">Profile not found</div>
      </div>
    );
  }

  const skills = [
    ['JavaScript', ProfileData.JSExp],
    ['React', ProfileData.ReactExp],
    ['HTML/CSS', ProfileData.HTMLCSSExp],
    ['Node.js', ProfileData.NodeExp],
    ['Python', ProfileData.PythonExp]
  ];

  const handleSocialLinkClick = (href: string) => {
    window.open(href, "_blank");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center p-4">
      <div className="grid grid-cols-12 grid-rows-4 gap-4 h-full w-5/6">
        <div className="bg-gradient-to-t from-red-700 via-black to-blue-700  rounded-3xl flex justify-center items-center col-span-4 row-span-4 p-10 py-5">
          <div className="h-full w-full grid grid-rows-2 gap-4">
            <div className="bg-blue-600  h-full w-full rounded-2xl flex flex-col justify-center items-center">
              <div className="rounded-full overflow-hidden h-16 w-16">
                <Image src={ProfileData.image} alt='profile image' layout="responsive" width={64} height={64} />
              </div>
              <h3 className="text-white text-xl mt-4">{ProfileData.name}</h3>
            </div>
            <div className="bg-blue-600  h-full w-full flex flex-col rounded-2xl justify-center items-center">
              <h1 className="text-3xl text-black">Work Status</h1>
              <div className="text-black text-2xl mt-10">
                Points: {ProfileData.points}
              </div>
              <div className="text-black text-2xl mt-4">
                Tasks Done: {ProfileData.TasksCount}
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gradient-to-tr from-blue-500 to-red-500 rounded-3xl flex flex-col col-span-8 row-span-2 p-10 py-5 overflow-hidden">
          <h1 className="text-xl text-white">About</h1>
          <div className="text-white text-lg">
            {ProfileData.About}
          </div>
          <div className="flex space-x-4 mt-4">
            {ProfileData.githubURL && (<div className="cursor-pointer text-blue-400 hover:text-blue-600" onClick={() => handleSocialLinkClick(ProfileData.githubURL)}><FaGithub /></div>)}
            {ProfileData.linkedInURL && (<div className="cursor-pointer text-blue-400 hover:text-blue-600" onClick={() => handleSocialLinkClick(ProfileData.linkedInURL)}><FaLinkedinIn /></div>)}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-gradient-to-tr from-blue-500 to-red-500 rounded-3xl flex flex-col justify-center items-center col-span-8 row-span-2 p-10 py-5 mb-4">
          <p className="text-white text-xl font-bold mb-4 ">
            Skills
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              skill[1] && (
                <div key={index} className="bg-gradient-to-tr from-blue-500 to-red-500 rounded-lg p-4 shadow-xl text-center">
                  <div className="text-indigo-800 font-bold">{skill[0]}</div>
                  <div className="text-gray-900">{skill[1]}</div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 h-full w-1/6 bg-blue-600  rounded-3xl py-5 p-10 ml-4 gap-y-5 mb-8">
        <div className="text-white justify-center items-center rounded-lg p-4">
          Achievement
        </div>
      </div>
    </div>
  );
}

export default ProfileContent;
