import React, { useState, useEffect } from 'react';
import { Sidebar, SidebarItem } from '@/components/dashboard/sidebar';
import Items from '@/components/dashboard/items';
import Leaderboard from '@/components/dashboard/leaderboard';
import Image from 'next/image';
import DashboardIcon from '@/public/icons/dashboard.svg';
import TasksIcon from '@/public/icons/tasks.svg';
import LeaderboardIcon from '@/public/icons/leaderboard.svg';
import ReportIssueIcon from '@/public/icons/reportissue.svg';
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Session } from 'next-auth';

export default function DashboardPage() {
  const [session, setSession] = useState<Session | null>(null); // Define session as Session | null

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await auth();
        setSession(sessionData);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchSession();
  }, []);

  // Handle initial state and loading state
  if (session === null) {
    return <p>Loading...</p>; // Render a loading indicator while fetching the session
  }

  if (!session || !session.user) {
    return <p>You need to be logged in to access your profile.</p>;
  }

  const userdat = session.user;

  const sidebarItems = [
    { icon: <Image src={DashboardIcon} alt="Dashboard" />, text: 'Dashboard', active: true, alert: false },
    { icon: <Image src={TasksIcon} alt="Messages" />, text: 'Messages', active: false, alert: true },
    { icon: <Image src={LeaderboardIcon} alt="Settings" />, text: 'Settings', active: false, alert: false },
    { icon: <Image src={ReportIssueIcon} alt="Report/Issue" />, text: 'Report/Issue', active: false, alert: false },
  ];

  return (
    <SessionProvider session={session}>
      <div className="flex h-screen bg-black">
        <Sidebar user={userdat}>
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              active={item.active}
              alert={item.alert}
            />
          ))}
        </Sidebar>

        <div className="flex-1 overflow-y-auto">
          {/* Example content in the main area */}
          <Items />
          <Leaderboard />
        </div>
      </div>
    </SessionProvider>
  );
}
