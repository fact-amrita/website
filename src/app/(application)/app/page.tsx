"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useSearchParams } from "next/navigation";
import Leaderboard from "@/components/dashboard/leaderboard";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider, useSession } from "next-auth/react";
import { getFact } from "@/lib/getFact";
import { getAnnouncements } from "@/lib/AdminOps";
import { HoverEffect } from "@/components/dashboard/HoverEffect"; // Adjust the import path as needed

const DashboardContent: React.FC = () => {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const messageParam = searchParams.get("message");
  const [fact, setFact] = useState("No entry for today.");
  const [announcements, setAnnouncements] = useState<
    { id: string; Announcement: string; Visiblefrom: string; VisibleTill: string }[]
  >([]);

  useEffect(() => {
    if (messageParam) {
      toast({
        variant: "default",
        title: "Server Message",
        description: `${messageParam}`,
        duration: 3000,
      });
      const newUrl = window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    }
  }, [messageParam, toast]);

  useEffect(() => {
    if (session?.user) {
      const userdat = session.user as { name: string; email: string; role: string; image: string };
      if (userdat.role === "onboarding") {
        toast({
          variant: "success",
          title: "Onboarding Required",
          description: "You need to complete the onboarding process.",
          duration: 10000,
          action: (
            <ToastAction altText="Onboarding Page" onClick={() => (window.location.href = "/app/onboarding")}>
              Let's Go
            </ToastAction>
          ),
        });
      }
    }
  }, [session?.user, toast]);

  useEffect(() => {
    getFact().then((fact) => {
      if (fact !== "") {
        setFact(fact);
      } else {
        setFact("No entry for today.");
      }
    });
  }, []);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getAnnouncements();
        setAnnouncements(response);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session || !session.user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">You need to be logged in to access your profile.</div>
      </div>
    );
  }

  const userdat = session.user as { name: string; email: string; role: string; image: string };

  const items = [
    {
      title: "Fact for the day",
      content: <p className="text-2xl text-blue-950">{fact}</p>,
      span: 4,
    },
    {
      title: "Announcements",
      content: (
        <div>
          {announcements.map((announcement) => (
            <div key={announcement.id}>
              <h2>{announcement.Announcement}</h2>
              <p>Date: {announcement.Visiblefrom}</p>
            </div>
          ))}
        </div>
      ),
      span: 8,
    },
    {
      title: "Events",
      content: <p>Events content goes here</p>,
      span: 8,
    },
    {
      title: "Timeline",
      content: <p>Timeline content goes here</p>,
      span: 4,
    },
  ];

  return (
    <div className="flex h-screen p-0 m-0 lg:flex-row flex-col">
      <div className="h-full w-full lg:w-4/5 bg-gradient-to-tr from-blue-700 via-gray-500 to-red-700 flex flex-col justify-center items-center p-4">
        <div className="h-auto lg:h-1/9 text-white text-left lg:text-left mb-4 lg:mb-0">
          <h1 className="text-xl lg:text-2xl font-bold mb-6 mt-2">Hello, {userdat.name}</h1>
          <h1 className="text-xl lg:text-2xl font-bold mb-6">Welcome to the FACT Club</h1>
        </div>
        <div className="h-full w-4/5">
          <HoverEffect items={items} />
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
