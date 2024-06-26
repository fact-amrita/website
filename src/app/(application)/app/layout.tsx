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
    const currentRoute = usePathname(); 
    const [expanded, setExpanded] = useState(false);

    const containerStyle = {
        marginLeft: expanded ? "10.9%" : "3.4%",
        transition: "margin-left 0.1s ease" 
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