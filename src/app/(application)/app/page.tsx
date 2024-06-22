'use client'; // Ensure this is the first line

import React, { useEffect } from 'react';
import { Sidebar, SidebarItem } from '@/components/dashboard/sidebar';
import Items from '@/components/dashboard/items';
import Leaderboard from '@/components/dashboard/leaderboard';
import Image from 'next/image';
import DashboardIcon from '@/public/icons/dashboard.svg';
import TasksIcon from '@/public/icons/tasks.svg';
import LeaderboardIcon from '@/public/icons/leaderboard.svg';
import ReportIssueIcon from '@/public/icons/reportissue.svg';
import { SessionProvider, useSession } from 'next-auth/react';

import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useSearchParams } from 'next/navigation';

const DashboardContent = () => {
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
    return <p></p>; // Suspense content can be added here
  }

  if (!session || !session.user) {
    return <p>You need to be logged in to access your profile.</p>;
  }

  const userdat = session.user as { name: string; email: string; role: string; image: string; };
  const sidebarItems = [
    { route: '/app', icon: <Image src={DashboardIcon} alt="Dashboard" />, text: 'Dashboard', active: true, alert: false },
    { route: '/app/tasks', icon: <Image src={TasksIcon} alt="Messages" />, text: 'Tasks', active: false, alert: true },
    { route: '/app/leaderboard', icon: <Image src={LeaderboardIcon} alt="Settings" />, text: 'LeaderBoard', active: false, alert: false },
    { route: '/app/ticket', icon: <Image src={ReportIssueIcon} alt="Report/Issue" />, text: 'Report/Issue', active: false, alert: false },
  ];


  return (
    <div className="bg-gradient-to-tr from-red-600 via-black to-blue-600 flex h-screen">
      <Sidebar user={userdat}>
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            router={item.route}
            icon={item.icon}
            text={item.text}
            active={item.active}
            alert={item.alert}
          />
        ))}
      </Sidebar>

      <div className="flex-1 overflow-y-auto">
        <Items />
        <Leaderboard />
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
