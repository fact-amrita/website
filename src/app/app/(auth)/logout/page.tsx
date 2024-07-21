"use client"

import { useEffect } from 'react';
import { SignOutfromAll } from "@/lib/signout";
import Image from 'next/image';
import logo from "@/public/images/logo_black.png"

export default function LogoutPage() {

    useEffect(() => {
        const signOutUser = async () => {
            await SignOutfromAll();
        };

        signOutUser();
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Image 
            src={logo}
            alt="FACT Logo" 
            height={90} 
            className="mx-auto mb-4" 
          />
          <h1 className="text-2xl font-semibold mb-2">You have signed out</h1>
          <p className="text-gray-600 mb-6">We hope to see you again soon.</p>
          <p className="text-gray-600 mb-6">Please wait while we take you to the login page</p>
        </div>
      </div>
    );
}