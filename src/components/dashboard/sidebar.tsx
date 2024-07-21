"use client";
import React, { ReactNode, FC } from 'react';
import { ChevronLast, ChevronFirst } from 'lucide-react'; // Fallback icons
import Image from "next/image";
import getTitle from "@/functions/titleget";
import logo from "@/public/images/logo_black.png";
import Link from 'next/link'; 

interface SidebarProps {
  children: ReactNode;
  user: {
    name: string;
    email: string;
    role: string;
    image: string;
    factId: string;
  }
}

const Sidebar: FC<SidebarProps> = ({ children, user }) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-52 transition-all duration-300 ease-in-out">
      <nav className="h-full flex flex-col bg-white shadow-md rounded-r-lg overflow-hidden">
        <div className="p-2 pb-2 flex justify-between items-center relative">
          <Image
            src={logo}
            className="w-32 transition-all"
            alt="Logo"
          />
          {/* You can remove the toggle button if the sidebar is always expanded */}
          {/* <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button> */}
        </div>

        <ul className="flex-1 px-3">{children}</ul>

        <div className="p-3">
          <Link href={`/app/profile/${user.factId}`}>
            <div className="flex items-center mb-3">
              <Image
                src={user.image || "https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"}
                alt="User Avatar"
                width={40}
                height={40}
                className="w-10 h-10 rounded-md"
              />
              <div className="flex flex-col justify-center ml-3">
                <h4 className="font-semibold">{user.name}</h4>
                {/* <span className="text-xs text-gray-600">{user.email}</span> */}
                <span className="text-xs text-gray-600">{getTitle(user.role)}</span>
              </div>
            </div>
          </Link>
          <Link href="/app/logout">
            <button
              className="w-full py-2 px-4 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

interface SidebarItemProps {
  router: string; 
  icon: ReactNode;
  text: string;
  active: boolean;
  alert?: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({ icon, text, router, active, alert = false }) => {
  return (
    <li className={`relative flex items-center py-2 px-2 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800' : 'hover:bg-indigo-50 text-gray-600'}`}>
      <Link href={router}>
        <div className="flex items-center w-full">
          {icon}
          <span className="overflow-hidden transition-all w-45 ml-3">{text}</span>
          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-indigo-400`}
            />
          )}
          <div
            className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
          >
            {text}
          </div>
        </div>
      </Link>
    </li>
  );
};

export { Sidebar, SidebarItem };
