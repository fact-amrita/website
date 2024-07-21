"use client"

import React from 'react';
import Image from 'next/image';
import DashboardIcon from '@/public/icons/dashboard.svg';
import TasksIcon from '@/public/icons/tasks.svg';
import LeaderboardIcon from '@/public/icons/leaderboard.svg';
import ReportIssueIcon from '@/public/icons/reportissue.svg';
import SearchIcon from '@/public/icons/search.svg';
import AdminIcon from '@/public/icons/admin.svg';
import { SessionProvider, useSession } from 'next-auth/react';
import { Sidebar, SidebarItem } from '@/components/dashboard/sidebar';
import { roleUpdateCheck } from '@/lib/roleCheck';

interface Props {
    children: React.ReactNode;
    activeRoute: string;
}

function SidebarForRoot({ children, activeRoute }: Props) {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <p></p>;
    }

    if (!session || !session.user) {
        return <div className="flex justify-center items-center h-screen">
            <div className="text-red-500 text-2xl">You need to be logged in to access your profile.</div>
        </div>;
    }

    const userdat = session.user as { name: string; email: string; role: string; image: string; factId: string };
    roleUpdateCheck(userdat.email, userdat.role);
    localStorage.setItem('factId', userdat.factId);
    const sidebarItems = [
        { route: '/app', icon: <Image src={DashboardIcon} alt="Dashboard" />, text: 'Dashboard', active: false, alert: false },
        { route: '/app/profile', icon: <Image src={SearchIcon} alt="Search Users" />, text: 'Directory', active: false, alert: false },
        { route: '/app/ticket', icon: <Image src={ReportIssueIcon} alt="Report/Feedback" />, text: 'Report/Feedback', active: false, alert: false },
    ];

    if (userdat.role === 'admin' || userdat.role === 'moderator' || userdat.role === 'president') {
        sidebarItems.push({ route: '/app/administration', icon: <Image src={AdminIcon} alt="Administration" className='w-5' />, text: 'Administration', active: false, alert: false });
    }

    if (userdat.role === 'member' || userdat.role === 'moderator' || userdat.role === 'president') {
        sidebarItems.splice(1, 0, { route: '/app/tasks', icon: <Image src={TasksIcon} alt="Tasks" />, text: 'Tasks', active: false, alert: false });
    }

    if (userdat.role === 'member') {
        sidebarItems.splice(2, 0, { route: '/app/leaderboard', icon: <Image src={LeaderboardIcon} alt="Leaderboard" />, text: 'LeaderBoard', active: false, alert: false });
    }

    return (
        <div className="bg-gradient-to-tr from-red-600 via-black to-blue-600 flex h-screen">
            <Sidebar user={userdat} >
                {sidebarItems.map((item, index) => (
                    <SidebarItem
                        key={index}
                        router={item.route}
                        icon={item.icon}
                        text={item.text}
                        active={item.route === activeRoute}
                        alert={item.alert}
                    />
                ))}
            </Sidebar>

            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}

export default function SidebarElement({ children, activeRoute}: Props) {
    return (
        <SessionProvider>
            <SidebarForRoot activeRoute={activeRoute}>
                {children}
            </SidebarForRoot>
        </SessionProvider>
    );
}
