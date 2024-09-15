"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { getUserProfile } from "@/lib/UserFetch";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import {
  AddPoints,
  updateProfileRemark,
  updateRating,
} from "@/lib/UserOperations";
import TableComponent from "@/components/TableComponent";
import { getLifetimePoints } from "@/lib/TaskOperations";

interface TableData {
  number: number;
  description: string;
  date: string;
  time?: string;
  points: number;
}

const ProfileContent = ({ params }: { params: { id: string } }) => {
  const { data: session, status } = useSession();
  const ProfileId = params.id;
  const router = useRouter();
  const [ProfileData, setProfileData] = useState<any>(null);
  const [bonusPoints, setBonusPoints] = useState<number>(0);
  const [clubRating, setClubRating] = useState<number>(0);
  const [taskList, setTaskList] = useState<any>([]);

  const handleEditProfile = () => {
    router.push("/app/edit_profile");
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
        setClubRating(ProfileData.ClubRating);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };
    profileDataGetter();
  }, [ProfileId]);

  useEffect(() => {
    const fetchTaskData = async () => {
      const factId = window.localStorage.getItem("factId") || "";
      const { list, points } = await getLifetimePoints(factId);
      setTaskList(list);
    };
    fetchTaskData();
  }, []);

  const taskData: TableData[] = taskList.map((task: any, index: number) => ({
    number: index + 1,
    description: task.task,
    date: task.completeTime,
    points: task.awarded || 0,
  }));

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

  const userdat = session?.user as {
    factId: string;
    name: string;
    email: string;
    role: string;
    image: string;
    domain: string;
  };

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
        },
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
        },
      });
      bonusReason = response.value;
    } else {
      return;
    }

    const response = await AddPoints(
      ProfileId,
      bonusPoints,
      bonusReason,
      userdat.factId || "Admin"
    );

    if (response) {
      Swal.fire({
        title: "Points Updated",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire({
        title: "Failed to update points",
        icon: "error",
      });
    }
  };

  const handleRemarkChange = async () => {
    const response = await updateProfileRemark(ProfileId, ProfileData.ProfileRemark);

    if (response) {
      Swal.fire({
        title: "Remarks Updated",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire({
        title: "Failed to update remarks",
        icon: "error",
      });
    }
  };

  const handleRatingChange = async () => {
    const response = await updateRating(ProfileId, clubRating);

    if (response) {
      Swal.fire({
        title: "Rating Updated",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire({
        title: "Failed to update rating",
        icon: "error",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col lg:flex-row justify-center items-start p-5 space-y-5 lg:space-y-0 lg:space-x-10 overflow-y-auto">
        <div className="grid grid-cols-12 grid-rows-7 gap-4 max-w-full">
          {/* Profile Section */}
          <div className="col-span-12 lg:col-span-4 row-span-7 p-6 bg-darkcharcoal rounded-3xl flex flex-col justify-center items-center space-y-6">
            <div className="bg-zinc-700 rounded-2xl p-6 flex flex-col items-center space-y-4">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                {ProfileData.image ? (
                  <Image
                    src={ProfileData.image}
                    alt="profile image"
                    layout="responsive"
                    width={64}
                    height={64}
                  />
                ) : (
                  <div className="bg-gray-300 h-full w-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <h3 className="text-white text-2xl">{ProfileData.name || "No Name Provided"}</h3>
              {ProfileData.Title && <h4 className="text-white text-lg">{ProfileData.Title}</h4>}
              {(window.localStorage.getItem("factId") === ProfileData.FactID) && (
                <button
                  onClick={handleEditProfile}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg transition-transform hover:translate-y-1 active:translate-y-0"
                >
                  Edit My Profile
                </button>
              )}
            </div>
            <div className="bg-zinc-700 p-6 rounded-2xl w-full flex flex-col items-center">
              <h1 className="text-white text-3xl mb-4">Performance</h1>
              {["admin", "president", "moderator"].includes(userdat.role) && (
                <div className="flex flex-col space-y-2">
                  <label className="text-white text-lg" htmlFor="bonusPoints">
                    Bonus/Penalty Points
                  </label>
                  <input
                    type="number"
                    id="bonusPoints"
                    className="border rounded p-2 h-10"
                    placeholder="Bonus/penalty points"
                    value={bonusPoints}
                    onChange={(e) => setBonusPoints(parseInt(e.target.value))}
                  />
                  <button
                    onClick={() => handleBonusSubmit(userdat.factId)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              )}
              <div className="text-white text-xl mb-2">Points: {ProfileData.points || 0}</div>
              <div className="text-white text-xl mb-2">Tasks Done: {ProfileData.TasksCount || 0}</div>
              {["admin", "president", "moderator"].includes(userdat.role) ? (
                <div className="flex flex-col space-y-2">
                  <label className="text-white text-lg" htmlFor="clubRating">
                    Profile Rating (out of 10)
                  </label>
                  <input
                    type="number"
                    className="border rounded p-2 h-10"
                    placeholder="Profile Rating"
                    value={clubRating}
                    onChange={(e) => setClubRating(parseInt(e.target.value))}
                  />
                  <button
                    onClick={handleRatingChange}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div className="text-white text-xl mb-2">Rating: {ProfileData.ClubRating || "N/A"}</div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-12 lg:col-span-8 row-span-7 p-6 bg-darkcharcoal rounded-3xl space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-700 space-y-4">
              <h1 className="text-white text-3xl mb-4">About</h1>
              <span className="text-white">{ProfileData.About || "No description available."}</span>
              <div className="text-md xl:text-lg opacity-80 text-white">
                Joined Date : {formatDate(ProfileData.RegisterDate)}
                {" "}
                {ProfileData.ResignDate && (<span>Resigned Date : {formatDate(ProfileData.ResignDate)}</span>)}
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
            <div className="p-6 rounded-3xl bg-zinc-700 space-y-4">
              <h1 className="text-white text-3xl mb-4">Profile Remarks</h1>
              <div className="flex space-x-4 text-white">
                <p>
                  {(userdat.role === "admin" || userdat.role === "president" || userdat.role === "moderator") ? (
                    <span className="w-full h-full">
                      <textarea
                        style={{ width: "initial" }}
                        className="w-full h-24 p-2 rounded-lg border border-gray-300 text-black"
                        value={ProfileData.ProfileRemark}
                        onChange={(e) => setProfileData({ ...ProfileData, ProfileRemark: e.target.value })}
                      />
                      <button onClick={() => { handleRemarkChange() }} className="bg-blue-500 text-white p-2 rounded mb-4 ml-2">Update Remarks</button>
                    </span>
                  ) : <span style={{ marginLeft: "0.7em", color: "white" }}>{(ProfileData.ProfileRemark && ProfileData.ProfileRemark != "") ? ProfileData.ProfileRemark : "No remarks available."}</span>}
                </p>
              </div>
            </div>
            {skills?.length > 0 && (
              <div className="p-6 rounded-3xl bg-zinc-700 space-y-4">
                <h1 className="text-white text-3xl mb-4">Skills</h1>
                <div className="flex flex-wrap gap-4">
                  {skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-600 px-4 py-2 text-white rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ position: "relative", left: "18%", width:"70%" }}>
        <TableComponent data={taskData} />
      </div>
    </>
  );
};

export default ProfileContent;
