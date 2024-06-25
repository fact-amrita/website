import React from 'react';


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) { // Access the current route

    return (
        <div>
            {children}
        </div>
    );
}
