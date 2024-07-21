'use client';

import React, { useState, useEffect } from 'react';
import { getNewbieUsers, makeMember } from '@/lib/UserOperations';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MemberListPage: React.FC = () => {
  const [members, setMembers] = useState<{ email: string; name: string }[]>([]);
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    const fetchNewbieUsers = async () => {
      const users = await getNewbieUsers();
      setMembers(users);
    };

    fetchNewbieUsers();
  }, []);


  const handlePromoteToMember = async (email: string) => {
    await makeMember(email);
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.email !== email)
    );
    MySwal.fire({
      title: "User promoted Successfully",
      text: `${email} is now a member!`,
      icon: "success"
    });
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 via-red-500 to-purple-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Member List</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <span className="text-lg font-medium mb-2">{member.name}</span>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                onClick={() => handlePromoteToMember(member.email)}
              >
                Make Member
              </button>
            </div>
          ))}
          {members.length === 0 && (
            <p className="text-center text-gray-800 col-span-3">No newbie users available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberListPage;
