"use client"

import type { Metadata } from "next";
import SidebarElement from "@/components/sidebarForRoot";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from '@/components/css/global.module.css';
import MobileOverlay from "@/components/MobileOverlayApp";


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

    // mobile overlay
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Function to check if the screen width is less than a certain size (e.g., 768px)
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        // Initial check
        handleResize();

        // Add event listener to track window resizing
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when component is unmounted
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (<>
        {isMobile ? <MobileOverlay /> :
            <div className={styles.josefinsans}>
                <SidebarElement activeRoute={currentRoute}>
                    <div style={containerStyle}>
                        {children}
                    </div>
                </SidebarElement >
            </div >
        }
    </>
    );
}