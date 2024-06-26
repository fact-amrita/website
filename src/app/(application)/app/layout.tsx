"use client"

import type { Metadata } from "next";
import SidebarElement from "@/components/sidebarForRoot";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentRoute = usePathname(); // Access the current route
    const [expanded, setExpanded] = useState(false);

    const containerStyle = {
        marginLeft: expanded ? "10.9%" : "2.6%",
        transition: "margin-left 0.3s ease" // Add this line for smooth transition
    };

    return (
        <div>
            <SidebarElement activeRoute={currentRoute} expanded={expanded} setExpanded={setExpanded}>
                <div style={containerStyle}>
                    {children}
                </div>
            </SidebarElement >
        </div >
    );
}