"use client"

import type { Metadata } from "next";
import SidebarElement from "@/components/sidebarForRoot";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from '@/components/css/global.module.css';


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentRoute = usePathname();
    const [expanded, setExpanded] = useState(false);

    const containerStyle = {
        marginLeft: expanded ? "10.9%" : "10.9%",
        transition: "margin-left 0.1s ease"
    };

    return (
        <div className={styles.josefinsans}>
            <SidebarElement activeRoute={currentRoute} expanded={expanded} setExpanded={setExpanded}>
                <div style={containerStyle}>
                    {children}
                </div>
            </SidebarElement >
        </div >
    );
}