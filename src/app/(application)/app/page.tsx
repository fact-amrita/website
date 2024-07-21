"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useSearchParams } from "next/navigation";
import Leaderboard from "@/components/dashboard/leaderboard";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider, useSession } from "next-auth/react";
import { getFact } from "@/lib/getFact";
import { getAnnouncements, getEvents, getTimelines } from "@/lib/AdminOps";
import { HoverEffect } from "@/components/dashboard/HoverEffect";
import Link from "next/link";

// Function to format date
const formatDate = (dateStr: string): string => {
  const [day, month, year] = dateStr.split('/').map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  const suffix = (day: number) => {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };
  return `${day}${suffix(day)} ${months[month - 1]}`;
};

const DashboardContent: React.FC = () => {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const messageParam = searchParams.get("message");
  const [fact, setFact] = useState("No entry for today.");
  const [announcements, setAnnouncements] = useState<
    { id: string; Announcement: string; Visiblefrom: string; VisibleTill: string }[]
  >([]);
  const [events, setEvents] = useState<
    { visibleFrom: string | number | Date; visibleTill: string | number | Date; event: string; link: string }[]
  >([]);
  const [timelineData, setTimelineData] = useState<{ date: string; title: string }[]>([]);

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
          title: "Congratulations !",
          description: "You are now one step closer to become a member of the FACT Club.",
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
    const fetchFact = async () => {
      try {
        const fact = await getFact();
        setFact(fact || "No entry for today.");
      } catch (error) {
        console.error("Error fetching fact:", error);
      }
    };
    fetchFact();
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

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const response = await getTimelines();
        const formattedData = response.map((item) => ({
          date: new Date(item.Date).toLocaleDateString("en-IN"),
          title: item.Title,
        }));
        setTimelineData(formattedData);
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      }
    };
    fetchTimelineData();
  }, []);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await getEvents();
        const formattedData = response.map((item) => ({
          visibleFrom: item.Visiblefrom,
          visibleTill: item.VisibleTill,
          event: item.Description,
          link: item.Link,
        }));
        setEvents(formattedData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEventData();
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session || !session.user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-white text-3xl">You need to be logged in to access your profile.</div>
      </div>
    );
  }

  const userdat = session.user as { name: string; email: string; role: string; image: string; domain: string };
  if (!userdat.domain) {
    userdat.domain = "";
  }

  const items = [
    {
      title: "Fact for the day",
      content: <p className="text-2xl text-orange-100">{fact}</p>,
      span: 4,
    },
    {
      title: "Announcements",
      content: (
        <div>
          {announcements.length ? (
            announcements.map((announcement) => (
              <div key={announcement.id}>
                <h2>{announcement.Announcement}</h2>
              </div>
            ))
          ) : (
            <div>No announcements to show</div>
          )}
        </div>
      ),
      span: 8,
    },
    {
      title: "Events",
      content: (
        <div>
          {events.length ? (
            events.map((event) => (
              <div key={event.event}>
                <h2>{event.event}</h2>
                {event.link && (
                  <p>
                    <Link href={event.link} className="hover:text-blue-600">Read More</Link>
                  </p>
                )}
              </div>
            ))
          ) : (
            <div>No events to show</div>
          )}
        </div>
      ),
      span: 8,
    },
    {
      title: "Timeline",
      content: (
        <div className="relative border-l-2 border-gray-300 pl-4">
          {timelineData.map((item, index) => (
            <div key={index} className="mb-8 ml-4">
              <div className="absolute -left-3 w-6 h-6 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="pl-6">
                <p className="text-blue-600 font-semibold">{formatDate(item.date)}</p>
                <p className="text-blue-600">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      ),
      span: 4,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen p-0 m-0 overflow-clip">
      <div className="h-full w-full lg:w-4/5 bg-gradient-to-tr from-blue-700 via-gray-500 to-red-700 flex flex-col justify-center items-center p-4">
        <div className="w-full lg:w-4/5 mb-4 grid grid-cols-2">
          <h1 className="col-span-1 text-xl lg:text-2xl text-left font-bold text-white mb-1 mt-14">Hello, {userdat.name}</h1>
          <h1 className="col-span-2 text-xl lg:text-2xl text-center font-bold text-white mb-1">Welcome to the FACT Club</h1>
        </div>
        <div className="w-full lg:w-4/5 flex flex-col justify-center items-center mb-10">
          <HoverEffect items={items} />
          <Leaderboard domain={userdat.domain} />
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
