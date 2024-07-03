"use client";

import React, { useEffect } from "react";
import { useToast,} from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
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

  useEffect(() => {
    if (session?.user) {
      const userdat = session.user as { name: string; email: string; role: string; image: string; };
      if (userdat.role === 'onboarding') {
        toast({
          variant: "success",
          title: "Onboarding Required",
          description: "You need to complete the onboarding process.",
          duration: 10000,
          action: (
            <ToastAction altText="Onboarding Page" onClick={() => window.location.href = '/app/onboarding'}>
              Let's Go
            </ToastAction>
          ),
        });
      }
    }
  }, [session?.user, toast]);

  if (status === 'loading') {
    return <p></p>;
  }

  if (!session || !session.user) {
    return <p>You need to be logged in to access your profile.</p>;
  }

  const userdat = session.user as { name: string; email: string; role: string; image: string; };
  const colSpans = [2, 3, 3, 2];
  
  

  return (
    <div className="flex h-screen p-0 m-0 lg:flex-row flex-col">
      <div className="h-full w-full lg:w-4/5 bg-gradient-to-tr from-blue-700 via-black to-red-700 flex flex-col justify-center items-center p-4">
        <div className="h-auto lg:h-1/9 text-white text-left lg:text-left mb-4 lg:mb-0">
          <h1 className="text-xl lg:text-2xl font-bold mb-6 ">Hello, {userdat.name}</h1>
          <h1 className="text-xl lg:text-2xl font-bold mb-6 ">Welcome to the FACT Club</h1>
        </div>  
        <div className="h-auto lg:h-3/4 w-full lg:w-4/5 p-1 rounded-lg flex flex-col lg:flex-row items-center lg:items-start">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 bg-transparent rounded shadow-md p-1 w-full h-full">
            {items.map((item, index) => (
              <div key={index} className={`col-span-${colSpans  [index % colSpans.length]} text-center  rounded-lg bg-gray-200 p-5`}>
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
