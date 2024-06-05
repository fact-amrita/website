import React from 'react';
import { Sidebar, SidebarItem } from '@/components/dashboard/sidebar';
import Items from '@/components/dashboard/items';
import Leaderboard from '@/components/dashboard/leaderboard';
import Image from 'next/image'; 
import DashboardIcon from '@/public/icons/dashboard.svg'; 
import TasksIcon from '@/public/icons/tasks.svg'; 
import LeaderboardIcon from '@/public/icons/leaderboard.svg'; 
import ReportIssueIcon from '@/public/icons/reportissue.svg'; 
import { BackgroundGradientAnimation } from '@/components/ui/background_animation';

export default function DashboardPage() {
  const sidebarItems = [
    { icon: <Image src={DashboardIcon} alt="Dashboard" />, text: 'Dashboard', active: true, alert: false },
    { icon: <Image src={TasksIcon} alt="Messages" />, text: 'Messages', active: false, alert: true },
    { icon: <Image src={LeaderboardIcon} alt="Settings" />, text: 'Settings', active: false, alert: false },
    { icon: <Image src={ReportIssueIcon} alt="Report/Issue" />, text: 'Report/Issue', active: false, alert: false },
  ];

  return (
    <div className="flex h-screen bg-black">
      <Sidebar>
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
  );
}
