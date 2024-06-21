"use client";

import React from "react";
import Image from "next/image";
import { FaLinkedinIn, FaGithub, FaStackOverflow } from 'react-icons/fa';
import { SessionProvider } from "next-auth/react";

const skills = [
  ['JavaScript', 'Advanced'],
  ['React', 'Intermediate'],
  ['HTML/CSS', 'Advanced'],
  ['Node.js', 'Intermediate'],
  ['Python', 'Intermediate']
];

const socialLinks = [
    { href: 'https://www.linkedin.com/your-linkedin-profile', icon: FaLinkedinIn },
    { href: 'https://github.com/your-github-username', icon: FaGithub },
    { href: 'https://stackoverflow.com/users/your-stackoverflow-id', icon: FaStackOverflow },
];

const ProfileContent = ({ profimg, name, points, tasks, about }: { profimg: string, name: string, points: number, tasks: number, about: string }) => {

  const handleSocialLinkClick = (href: string) => {
    window.open(href, "_blank");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center p-4">
      <div className="grid grid-cols-12 grid-rows-4 gap-4 h-full w-5/6">
        {/* Left Section */}
        <div className="bg-blue-700 rounded-3xl flex justify-center items-center col-span-4 row-span-4 p-10 py-5">
          <div className="h-full w-full grid grid-rows-2 gap-4">
            {/* Profile Section */}
            <div className="bg-blue-700 h-full w-full rounded-2xl flex flex-col justify-center items-center">
              <div className="rounded-full overflow-hidden h-32 w-32">
                <Image src={profimg} alt='profile image' layout="fill" objectFit="cover" />
              </div>
              <h3 className="text-white text-xl mt-4">{name}</h3>
            </div>
            {/* Work Status Section */}
            <div className="bg-blue-700 h-full w-full flex flex-col rounded-2xl justify-center items-center">
              <h1 className="text-3xl text-black">Work Status</h1>
              <div className="text-black text-2xl mt-10">
                Points: {points}
              </div>
              <div className="text-black text-2xl mt-4">
                Tasks Done: {tasks}
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-blue-700 rounded-3xl flex flex-col col-span-8 row-span-2 p-10 py-5 overflow-hidden">
          <h1 className="text-xl text-white">About</h1>
          <div className="text-white text-lg">
            {about}
          </div>
          <div className="flex space-x-4 mt-4">
            {socialLinks.map((link, index) => (
              <div key={index} className="cursor-pointer text-blue-400 hover:text-blue-600" onClick={() => handleSocialLinkClick(link.href)}>
                <link.icon /> {/* Render the icon directly */}
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-blue-700 rounded-3xl flex flex-col justify-center items-center col-span-8 row-span-2 p-10 py-5">
          <p className="text-white text-xl font-bold mb-4">
            Skills
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-lg text-center">
                <div className="text-indigo-500 font-bold">{skill[0]}</div>
                <div className="text-gray-500">{skill[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="grid grid-cols-1 h-full w-1/6 bg-blue-700 rounded-3xl py-5 p-10 ml-4 gap-y-5">
        <div className="text-white justify-center items-center rounded-lg p-4">
          Achievement
        </div>
      </div>
    </div>
  );
}

const ProfilePage = () => {
    <SessionProvider>
        <ProfileContent profimg={""} name={""} points={0} tasks={0} about={""} />
    </SessionProvider>
}

export default ProfilePage;
