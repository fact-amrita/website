"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { getUserProfile } from "@/lib/UserFetch";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from 'sweetalert2';
import { AddPoints, updateProfileRemark } from "@/lib/UserOperations";
import TableComponent from '@/components/TableComponent';

const ProfileContent = ({ params }: { params: { id: string } }) => {
  const { data: session, status } = useSession();
  const ProfileId = params.id;
  const router = useRouter();
  const [ProfileData, setProfileData] = useState<any>(null);
  const [bonusPoints, setBonusPoints] = useState<number>(0);

  const sampleData = [
    { number: 1, description: 'Task 1', date: '2024-08-01', points: 10 },
    { number: 2, description: 'Task 2', date: '2024-08-02', points: 20 },
    { number: 2, description: 'Task 2', date: '2024-08-02', points: 20 },
    { number: 2, description: 'Task 2', date: '2024-08-02', points: 20 },
    { number: 2, description: 'Task 2', date: '2024-08-02', points: 20 },
    // Add more sample data if needed
  ];

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
    return <p>Loading...</p>;
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
    window.open(href, "_blank");
  };

  if (status === "loading") {
    return <p>Loading...</p>;
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

  const handleRemarkChange = async () => {
    const response = await updateProfileRemark(ProfileId, ProfileData.ProfileRemark);

    if (response) {
      Swal.fire({
        title: "Remarks Updated",
        icon: "success"
      }).then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire({
        title: "Failed to update remarks",
        icon: "error"
      });
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col lg:flex-row justify-center items-center p-5 overflow-y-auto overflow-x-clip">
        <div style={{ marginLeft: "5%" }} className="grid grid-cols-12 grid-rows-7 gap-7 h-full max-w-full px-4">
          <div className="bg-darkcharcoal rounded-3xl flex justify-center items-center col-span-4 row-span-7 p-10">
            <div className="h-full w-screen grid grid-rows-2 gap-7">
              <div className="bg-zinc-700 h-full w-full rounded-2xl flex flex-col justify-center items-center">
                <div className="rounded-full overflow-hidden h-16 w-16">
                  {ProfileData.image ? (
                    <Image src={ProfileData.image} alt='profile image' layout="responsive" width={64} height={64} />
                  ) : (
                    <div className="bg-gray-300 h-full w-full flex items-center justify-center text-gray-500">No Image</div>
                  )}
                </div>
                <h3 className="text-white text-xl mt-4 text-center">{ProfileData.name || "No Name Provided"}</h3>
                {ProfileData.Title && <h3 className="text-white text-base mt-4">{ProfileData.Title}</h3>}
                {(window.localStorage.getItem('factId') === ProfileData.FactID) && (
                  <button onClick={handleEditProfile} className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                  border-blue-600
                  border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                  active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">Edit My Profile</button>
                )}
              </div>
              <div className="bg-zinc-700 h-full w-full flex flex-col rounded-2xl justify-center items-center">
                <h1 className="text-3xl text-black">Performance</h1>
                {(userdat.role === "admin" || userdat.role === "president" || userdat.role === "moderator") && (
                  <div>
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
                  </div>
                )}
                <div className="text-black text-2xl mt-10">
                  Points: {ProfileData.points || 0}
                </div>
                <div className="text-black text-2xl mt-4">
                  Tasks Done: {ProfileData.TasksCount || 0}
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="w-full bg-zinc-700 rounded-3xl flex flex-col col-span-8 row-span-2 p-10 py-5 overflow-hidden">
            <h1 className="text-xl text-white font-bold">About</h1>
            <div className="text-white text-lg">
              {ProfileData.About || "No description available."}
              <div className="text-sm opacity-80">
                Joined Date : {formatDate(ProfileData.RegisterDate)}
                {" "}
                {ProfileData.ResignDate && (<span>Resigned Date : {formatDate(ProfileData.ResignDate)}</span>)}
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              {ProfileData.githubURL && (
                <div className="cursor-pointer text-blue-400 hover:text-blue-600" onClick={() => handleSocialLinkClick(ProfileData.githubURL)}>
                  <FaGithub />
                </div>
              )}
              {ProfileData.linkedInURL && (
                <div className="cursor-pointer text-blue-400 hover:text-blue-600" onClick={() => handleSocialLinkClick(ProfileData.linkedInURL)}>
                  <FaLinkedinIn />
                </div>
              )}
            </div>
          </div>

          {/* Profile Remarks Section */}
          <div className="bg-zinc-700 rounded-3xl flex flex-col items-start col-span-8 row-span-2 p-1 mb-1">
            <p className="text-white text-xl font-bold mb-1 mt-4 ml-3 w-full text-left">
              Profile Remarks
            </p>
            <p>
              {(userdat.role === "admin" || userdat.role === "president" || userdat.role === "moderator") ? (
                <span className="w-full h-full">
                  <textarea
                    style={{ width: "initial" }}
                    className="w-full h-24 p-2 rounded-lg border border-gray-300"
                    value={ProfileData.ProfileRemark}
                    onChange={(e) => setProfileData({ ...ProfileData, ProfileRemark: e.target.value })}
                  />
                  <button onClick={() => { handleRemarkChange() }} className="bg-blue-500 text-white p-2 rounded mb-4 ml-2">Update Remarks</button>
                </span>
              ) : <span style={{marginLeft:"0.7em", color:"white"}}>{(ProfileData.ProfileRemark && ProfileData.ProfileRemark != "") ? ProfileData.ProfileRemark : "No remarks available."}</span>}
            </p>
          </div>


          {/* Skills Section */}
          <div className="bg-zinc-700 rounded-3xl flex flex-col justify-center items-center col-span-8 row-span-3 p-5 py-5 mb-4">
            <p className="text-white text-xl font-bold mb-4">
              Skills
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill: string, index: React.Key | null | undefined) => (
                (skill && (
                  <div key={index} className="bg-black text-white py-2 px-4 rounded-lg shadow-md">
                    {skill}
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-7xl rounded-xl border border-gray-200 shadow-lg bg-white p-4 mb-5 mx-auto flex flex-col items-center">
        <TableComponent data={sampleData} />
      </div>



    </>
  );
};

export default ProfileContent;
