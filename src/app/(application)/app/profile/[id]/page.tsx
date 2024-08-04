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

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const userdat = session?.user as { factId: string, name: string; email: string; role: string; image: string; domain: string };

  const handleBonusSubmit = async (factId: string) => {
    let bonusReason; // Declare bonusReason at the beginning of the function

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
    <div className="h-screen w-full flex flex-col lg:flex-row justify-center items-center p-5 overflow-clip">
      <div style={{ marginLeft: "5%" }} className="grid grid-cols-12 grid-rows-4 gap-7 h-full max-w-full px-4">
        <div className="bg-gradient-to-t from-red-700 via-black to-blue-700  rounded-3xl flex justify-center items-center col-span-4 row-span-4 p-10">
          <div className="h-full w-full grid grid-rows-2 gap-7">
            <div className="bg-gradient-to-tr from-blue-500 to-red-500  h-full w-full rounded-2xl flex flex-col justify-center items-center">
              <div className="rounded-full overflow-hidden h-16 w-16">
                <Image src={ProfileData.image} alt='profile image' layout="responsive" width={64} height={64} />
              </div>
              <h3 className="text-white text-xl mt-4 text-center">{ProfileData.name}</h3>
              {ProfileData.Title && <h3 className="text-white text-base mt-4">{ProfileData.Title}</h3>}
              {(window.localStorage.getItem('factId') == ProfileData.FactID) && (<button onClick={handleEditProfile} className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
              border-blue-600
              border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
              active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">Edit My Profile</button>)}
            </div>
            <div className="bg-gradient-to-tr from-blue-500 to-red-500  h-full w-full flex flex-col rounded-2xl justify-center items-center">
              <h1 className="text-3xl text-black">Performance</h1>
              {(userdat.role == "admin" || userdat.role == "president" || userdat.role == "moderator") && (<div>
                <label htmlFor="bonusPoints" title={"Enter positive number for bonus and negative number for penalty"}>
                  Enter bonus/penalty points
                </label>
                <div className="flex" style={{ marginBottom: "-30px", marginTop: "15px" }}>
                  <input
                    type="number"
                    id="bonusPoints"
                    className="border rounded p-2 h-10"
                    placeholder="Bonus/penalty points"
                    value={bonusPoints}
                    onChange={(e) => setBonusPoints(parseInt(e.target.value))}
                  />
                  <button onClick={() => { handleBonusSubmit(userdat.factId) }} className="bg-green-500 text-white p-2 rounded mb-4 ml-2">Submit</button>
                </div>
              </div>)}
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
        <div className=" w-full bg-gradient-to-tr from-blue-500 to-red-500 rounded-3xl flex flex-col col-span-8 row-span-2 p-10 py-5 overflow-hidden">
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
              (skill[1] && skill[1] != "null") && (
                <div key={index} className="bg-gradient-to-tr from-blue-500 to-red-500 rounded-lg p-4 shadow-xl text-center">
                  <div className="text-indigo-800 font-bold">{skill[0]}</div>
                  <div className="text-gray-900">{skill[1]}</div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 h-full w-1/6 bg-blue-600  rounded-3xl py-5 p-10 ml-4 gap-y-5 mb-8">
        <div className="text-white justify-center items-center rounded-lg p-4">
          Achievement
        </div>
      </div> */}
    </div>
  );
}

export default ProfileContent;
