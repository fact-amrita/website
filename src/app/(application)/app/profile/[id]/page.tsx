"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { getUserProfile } from "@/lib/UserFetch";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from 'sweetalert2';
import { AddPoints } from "@/lib/UserOperations";

const ProfileContent = ({ params }: { params: { id: string } }) => {
  const { data: session, status } = useSession();
  const ProfileId = params.id;
  const router = useRouter();
  const [ProfileData, setProfileData] = useState<any>(null);
  const [bonusPoints, setBonusPoints] = useState<number>(0);

  const handleEditProfile = () => {
    router.push('/app/edit_profile');
  };

  useEffect(() => {
    const profileDataGetter = async () => {
      try {
        const data = await getUserProfile(ProfileId);
        if (!data) {
          setProfileData("not found");
          return;
        }
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };
    profileDataGetter();
  }, [ProfileId]);

  if (!ProfileData) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  if (ProfileData === "not found") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">Profile not found</div>
      </div>
    );
  }

  const skills = ProfileData.Skills;

  const handleSocialLinkClick = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  if (status === "loading") {
    return <p className="text-center mt-8">Loading...</p>;
  }

  const userdat = session?.user as { factId: string, name: string; email: string; role: string; image: string; domain: string };

  const handleBonusSubmit = async (factId: string) => {
    let bonusReason;

    if (bonusPoints < 0) {
      const response = await Swal.fire({
        title: "Reason please",
        input: "text",
        icon: "question",
        inputLabel: "Enter the reason for the penalty",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        }
      });
      bonusReason = response.value;
    } else if (bonusPoints > 0) {
      const response = await Swal.fire({
        title: "Reason please",
        input: "text",
        icon: "info",
        inputLabel: "Enter the reason for the bonus",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        }
      });
      bonusReason = response.value;
    } else {
      return;
    }

    const response = await AddPoints(ProfileId, bonusPoints, bonusReason, userdat.factId || "Admin");

    if (response) {
      Swal.fire({
        title: "Points Updated",
        icon: "success"
      }).then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire({
        title: "Failed to update points",
        icon: "error"
      });
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row justify-center items-center p-0 lg:p-0  overflow-x-hidden">
      <div className="w-screen max-w-8xl grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="h-screen bg-gradient-to-t from-red-700 via-black to-blue-700 rounded-3xl flex flex-col justify-between col-span-1 lg:col-span-4 p-6">
          <div className="bg-gradient-to-tr from-blue-500 to-red-500 rounded-2xl flex flex-col justify-center items-center p-4 h-1/2">
            <div className="rounded-full overflow-hidden h-20 w-20 lg:h-24 lg:w-24">
              {ProfileData.image ? (
                <Image src={ProfileData.image} alt='profile image' layout="responsive" width={96} height={96} />
              ) : (
                <div className="bg-gray-300 h-full w-full flex items-center justify-center text-gray-500">No Image</div>
              )}
            </div>
            <h3 className="text-white text-xl mt-1 text-center">{ProfileData.name || "No Name Provided"}</h3>
            {ProfileData.Title && <h3 className="text-white text-base mt-2">{ProfileData.Title}</h3>}
            {(typeof window !== 'undefined' && window.localStorage.getItem('factId') === ProfileData.FactID) && (
              <button onClick={handleEditProfile} className="mt-2 cursor-pointer transition-all bg-blue-500 text-white px-4 py-2 rounded-lg
              border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
              active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">Edit My Profile</button>
            )}
          </div>
          <div className="bg-gradient-to-tr from-blue-500 to-red-500 rounded-2xl flex flex-col justify-center items-center p-2 h-1/2 mt-3">
            <h1 className="text-2xl lg:text-3xl text-black mb-4">Performance</h1>
            {(userdat.role === "admin" || userdat.role === "president" || userdat.role === "moderator") && (
              <div className="w-full mb-4">
                <label htmlFor="bonusPoints" className="block text-sm font-medium text-gray-700 mb-1" title="Enter positive number for bonus and negative number for penalty">
                  Enter bonus/penalty points
                </label>
                <div className="flex">
                  <input
                    type="number"
                    id="bonusPoints"
                    className="border rounded p-2 h-10 w-full"
                    placeholder="Bonus/penalty points"
                    value={bonusPoints}
                    onChange={(e) => setBonusPoints(parseInt(e.target.value))}
                  />
                  <button onClick={() => { handleBonusSubmit(userdat.factId) }} className="bg-green-500 text-white p-2 rounded ml-2">Submit</button>
                </div>
              </div>
            )}
            <div className="text-black text-xl lg:text-2xl mt-2">
              Points: {ProfileData.points || 0}
            </div>
            <div className="text-black text-xl lg:text-2xl mt-2">
              Tasks Done: {ProfileData.TasksCount || 0}
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-8 grid grid-rows-3 gap-3">
          <div className="bg-gradient-to-tr from-blue-500 to-red-500 rounded-3xl flex flex-col p-6 h-full">
            <h1 className="text-xl text-white mb-4">About</h1>
            <div className="text-white text-lg flex-grow overflow-auto">
              {ProfileData.About || "No description available."}
            </div>
            <div className="flex space-x-4 mt-4">
              {ProfileData.githubURL && (
                <div className="cursor-pointer text-blue-400 hover:text-blue-600" onClick={() => handleSocialLinkClick(ProfileData.githubURL)}>
                  <FaGithub size={24} />
                </div>
              )}
              {ProfileData.linkedInURL && (
                <div className="cursor-pointer text-blue-400 hover:text-blue-600" onClick={() => handleSocialLinkClick(ProfileData.linkedInURL)}>
                  <FaLinkedinIn size={24} />
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-tr from-blue-500 to-red-500 rounded-3xl flex flex-col p-6 h-full">
            <h2 className="text-white text-xl font-bold mb-4">Profile Remarks</h2>
            <div className="text-white text-lg">
              {ProfileData.remarks || "No remarks available."}
            </div>
          </div>

          <div className="bg-gradient-to-tr from-blue-500 to-red-500 rounded-3xl flex flex-col p-6 h-full">
            <h2 className="text-white text-xl font-bold mb-4">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill: string, index: React.Key | null | undefined) => (
              (skill && skill != "None") && (
                <div key={index} className="bg-gradient-to-tr from-blue-500 to-red-500 rounded-lg p-4 shadow-xl text-center">
                  <div className="text-indigo-800 font-bold">{skill}</div>
                </div>
              )
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileContent;
