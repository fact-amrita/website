"use client";

import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import Leaderboard from "@/components/dashboard/leaderboard";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider, useSession } from "next-auth/react";
import SidebarElement from "@/components/sidebarForRoot";

const DashboardContent: React.FC = () => {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const messageParam = searchParams.get("message");

  useEffect(() => {
    // ... existing logic for handling messageParam
  }, [messageParam, toast]);

  if (status === 'loading') {
    return <p></p>;
  }

  if (!session || !session.user) {
    return <p>You need to be logged in to access your profile.</p>;
  }

  const userdat = session.user as { name: string; email: string; role: string; image: string; };

  return (
    <div className="flex h-screen p-0 m-0 ">
      <SidebarElement children={undefined} activeRoute={''} />
      <div className="w-4/5 h-full bg-gradient-to-tr from-blue-700 via-black to-red-700 flex flex-col justify-center items-center p-4">
        <div className="h-1/9 p-4 text-white">
          <h1 className="text-3xl font-bold mb-2">Hello,</h1>
          <span className="text-3xl font-medium">{userdat.name}</span>
        </div>
        <div className="h-3/4 w-full p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 bg-transparent rounded shadow-md p-1 h-full w-full">
            {items.map((item, index) => (
              <div key={index} className="col-span-1 text-center rounded-lg bg-gray-200 p-4">
                {item}
              </div>
            ))}
            <Leaderboard />
          </div>
        </div>
      </div>
        <Toaster />
    </div>
  );
};


const DashboardPage = () => (
  <SessionProvider>
    <DashboardContent />
  </SessionProvider>
);

export default DashboardPage;
