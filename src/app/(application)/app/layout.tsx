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

    const containerStyle = {
        marginLeft: "10.9%",
        transition: "margin-left 0.1s ease"
    };

    return (
        <div className={styles.josefinsans}>
            <SidebarElement activeRoute={currentRoute}>
                <div style={containerStyle}>
                    {children}
                </div>
            </SidebarElement >
        </div >
    );
}