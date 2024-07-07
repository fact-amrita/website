"use client";

import React, { useState, useEffect } from "react";
import { useToast,} from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useSearchParams } from "next/navigation";
import Leaderboard from "@/components/dashboard/leaderboard";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider, useSession } from "next-auth/react";
import FactPage from "@/components/dashboard/member/factpage";

const DashboardContent: React.FC = () => {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const messageParam = searchParams.get("message");
  const [facts, setFacts] = useState<Record<number, string>>({});

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
  
    const fetchFacts = async () => {
      const response = await fetch('/api/facts');
      const data = await response.json();
      setFacts(data);
    };

    fetchFacts();
  }, []);

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
              Let`&apos;`s Go
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
  
  

  return (
    <div className="flex h-screen p-0 m-0 lg:flex-row flex-col">
      <div className="h-full w-full lg:w-4/5 bg-gradient-to-tr from-blue-700 via-black to-red-700 flex flex-col justify-center items-center p-4">
        <div className="h-auto lg:h-1/9 text-white text-left lg:text-left mb-4 lg:mb-0">
          <h1 className="text-xl lg:text-2xl font-bold mb-6 ">Hello, {userdat.name}</h1>
          <h1 className="text-xl lg:text-2xl font-bold mb-6 ">Welcome to the FACT Club</h1>
        </div>  
        <div className="h-full w-4/5  ">
          <div className="grid grid-cols-7 gap-2 bg-transparent rounded shadow-md w-full h-full">
          <div className="col-span-3 bg-gray-200 p-4 rounded shadow-md">
          <FactPage facts={facts} />
          </div>
          <div className="col-span-4 bg-gray-300 p-4 rounded shadow-md">
            Content for item 2 (wider)
          </div>
          <div className="col-span-4 bg-gray-400 p-4 rounded shadow-md">
            Content for item 3 (responsive)
          </div>
          <div className="col-span-3 bg-gray-400 p-4 rounded shadow-md">
            Content for item 3 (responsive)
          </div>
          </div>
          <Leaderboard />
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
