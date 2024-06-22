import type { Metadata } from "next";
import SidebarElement from "@/components/sidebarForRoot";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <SidebarElement>
                {children}
            </SidebarElement>
        </div>
    );
}
