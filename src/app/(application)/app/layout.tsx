"use client"

import type { Metadata } from "next";
import SidebarElement from "@/components/sidebarForRoot";
import React from 'react';
import { usePathname } from 'next/navigation';


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentRoute = usePathname(); // Access the current route

    return (
        <div>
            <SidebarElement activeRoute={currentRoute}>
                {children}
            </SidebarElement>
        </div>
    );
}
