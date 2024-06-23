"use client"

import React from 'react';
import Image from 'next/image';
import DashboardIcon from '@/public/icons/dashboard.svg';
import TasksIcon from '@/public/icons/tasks.svg';
import LeaderboardIcon from '@/public/icons/leaderboard.svg';
import ReportIssueIcon from '@/public/icons/reportissue.svg';
import { SessionProvider, useSession } from 'next-auth/react';
import { Sidebar, SidebarItem } from '@/components/dashboard/sidebar';

type Props = {
    children: React.ReactNode;
    activeRoute: string;
};

function SidebarForRoot({ children, activeRoute }: Props) {

    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <p></p>;
    }

    if (!session || !session.user) {
        return <p>You need to be logged in to access your profile.</p>;
    }

    const userdat = session.user as { name: string; email: string; role: string; image: string; };

    const sidebarItems = [
        { route: '/app', icon: <Image src={DashboardIcon} alt="Dashboard" />, text: 'Dashboard', active: false, alert: false },
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

export default function SidebarElement({ children, activeRoute }: Props) {
    return (
        <SessionProvider>
            <SidebarForRoot children={children} activeRoute={activeRoute} />
        </SessionProvider>
    );
}