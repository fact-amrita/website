"use client";

import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import Leaderboard from "@/components/dashboard/leaderboard";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider, useSession } from "next-auth/react";

const DashboardContent: React.FC = () => {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const messageParam = searchParams.get("message");

  useEffect(() => {
    if (messageParam) {
      toast({
        variant: "default",
        title: "Server Message",
        description: `${messageParam}`,
        duration: 3000,
      });
      const newUrl = window.location.pathname;
      window.history.replaceState(null, '', newUrl);
    }
  }, [messageParam, toast]);

  if (status === 'loading') {
    return <p></p>;
  }

  if (!session || !session.user) {
    return <p>You need to be logged in to access your profile.</p>;
  }

  const userdat = session.user as { name: string; email: string; role: string; image: string; };

  return (
    <div className="flex h-screen p-0 m-0 lg:flex-row flex-col">
      <div className="h-full w-full lg:w-4/5 bg-gradient-to-tr from-blue-700 via-black to-red-700 flex flex-col justify-center items-center p-4">
        <div className="h-auto lg:h-1/9 text-white text-center lg:text-left mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Hello,</h1>
          <span className="text-2xl lg:text-3xl font-medium">{userdat.name}</span>
        </div>
        <div className="h-auto lg:h-3/4 w-full lg:w-4/5 p-1 rounded-lg flex flex-col lg:flex-row items-center lg:items-start">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 bg-transparent rounded shadow-md p-1 w-full">
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
