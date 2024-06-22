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

  return (<div>
    <Items />
    <Leaderboard />
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
